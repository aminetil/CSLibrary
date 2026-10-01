import { db } from "@/lib/db";
import { DocumentTypeEnum } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const universityId = searchParams.get("universityId");
  const typeParam = searchParams.get("type");
  const sort = searchParams.get("sort") ?? "recent";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = 20;

  try {
    const docType = typeParam && Object.values(DocumentTypeEnum).includes(typeParam as DocumentTypeEnum)
      ? (typeParam as DocumentTypeEnum)
      : undefined;

    const where: any = {
      status: "APPROVED",
      ...(universityId ? { universityId } : {}),
      ...(docType ? { type: docType } : {}),
    };

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    const orderBy: any =
      sort === "recent"
        ? { createdAt: "desc" }
        : sort === "downloads"
        ? { downloadCount: "desc" }
        : { createdAt: "desc" };

    const [results, total] = await Promise.all([
      db.document.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          module: true,
          uploader: { select: { username: true, avatarUrl: true } },
        },
      }),
      db.document.count({ where }),
    ]);

    return NextResponse.json({
      results,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json({ error: "Erreur lors de la recherche de documents" }, { status: 500 });
  }
}
