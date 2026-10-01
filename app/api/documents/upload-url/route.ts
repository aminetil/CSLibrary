import { auth } from "@/lib/auth";
import { getUploadUrl } from "@/lib/storage";
import { checkRateLimit } from "@/lib/rate-limit";
import { uploadUrlSchema } from "@/lib/validation/schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const isAllowed = await checkRateLimit(`upload:${session.user.id}`, 10, 3600);
  if (!isAllowed) {
    return NextResponse.json(
      { error: "Limite d'upload atteinte (10 par heure). Réessayez plus tard." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = uploadUrlSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const fileKey = `pending/${session.user.id}/${crypto.randomUUID()}.pdf`;
    const uploadUrl = await getUploadUrl(fileKey, parsed.data.mimeType);

    return NextResponse.json({ uploadUrl, key: fileKey });
  } catch (err) {
    console.error("Presigned URL generation error:", err);
    return NextResponse.json({ error: "Erreur lors de la génération de l'URL d'upload" }, { status: 500 });
  }
}
