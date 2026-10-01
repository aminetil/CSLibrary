import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createDocumentSchema } from "@/lib/validation/schemas";
import { NextResponse } from "next/server";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = createDocumentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    // Check duplicate by SHA-256 hash
    const existing = await db.document.findUnique({
      where: { fileHash: data.fileHash },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Un document identique existe déjà dans la base.", existingId: existing.id },
        { status: 409 }
      );
    }

    const module_ = await db.module.findUnique({
      where: { id: data.moduleId },
      include: {
        semester: {
          include: {
            level: {
              include: {
                specialty: {
                  include: {
                    university: true,
                    department: {
                      include: {
                        faculty: {
                          include: { university: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!module_) {
      return NextResponse.json({ error: "Module introuvable" }, { status: 400 });
    }

    const spec = module_.semester.level.specialty;
    const universityId = spec.university?.id ?? spec.department?.faculty.university.id;

    if (!universityId) {
      return NextResponse.json({ error: "Hiérarchie académique incomplète" }, { status: 400 });
    }

    const baseSlug = slugify(data.title);
    const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

    const document = await db.document.create({
      data: {
        title: data.title,
        slug: uniqueSlug,
        description: data.description,
        type: data.type,
        academicYear: data.academicYear,
        status: "PENDING",
        universityId,
        levelId: module_.semester.level.id,
        moduleId: data.moduleId,
        uploaderId: session.user.id,
        fileKey: data.key,
        fileHash: data.fileHash,
        fileSizeBytes: data.fileSize,
        mimeType: "application/pdf",
      },
    });

    await db.notification.create({
      data: {
        userId: session.user.id,
        message: `Ton document "${data.title}" a été soumis pour modération.`,
        link: `/dashboard/my-documents`,
      },
    });

    return NextResponse.json({ success: true, documentId: document.id });
  } catch (err) {
    console.error("Document creation error:", err);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement du document" }, { status: 500 });
  }
}
