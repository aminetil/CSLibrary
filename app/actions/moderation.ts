"use server";

import { db } from "@/lib/db";
import { r2 } from "@/lib/storage";
import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

export async function approveDocument(documentId: string, adminId: string = "system-admin") {
  const doc = await db.document.findUniqueOrThrow({ where: { id: documentId } });

  // Move file from pending/ to documents/ in Cloudflare R2
  const newKey = doc.fileKey.replace("pending/", "documents/");
  try {
    const bucket = process.env.R2_BUCKET_NAME || "docstudy-bucket";
    await r2.send(
      new CopyObjectCommand({
        Bucket: bucket,
        CopySource: `${bucket}/${doc.fileKey}`,
        Key: newKey,
      })
    );
    await r2.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: doc.fileKey,
      })
    );
  } catch (err) {
    console.warn("Storage relocation error (proceeding with DB update):", err);
  }

  await db.$transaction([
    db.document.update({
      where: { id: documentId },
      data: {
        status: "APPROVED",
        fileKey: newKey,
        moderatedById: adminId,
        moderatedAt: new Date(),
      },
    }),
    db.contribution.create({
      data: {
        userId: doc.uploaderId,
        points: 10,
        reason: "document_approved",
      },
    }),
    db.user.update({
      where: { id: doc.uploaderId },
      data: { contributionPoints: { increment: 10 } },
    }),
    db.notification.create({
      data: {
        userId: doc.uploaderId,
        message: `Ton document "${doc.title}" a été approuvé ! +10 points.`,
        link: `/documents/${doc.slug}`,
      },
    }),
  ]);

  await maybeAwardBadges(doc.uploaderId);
  revalidatePath("/admin/moderation");
  return { success: true };
}

export async function rejectDocument(documentId: string, reason: string, adminId: string = "system-admin") {
  const doc = await db.document.update({
    where: { id: documentId },
    data: {
      status: "REJECTED",
      rejectionReason: reason,
      moderatedById: adminId,
      moderatedAt: new Date(),
    },
  });

  await db.notification.create({
    data: {
      userId: doc.uploaderId,
      message: `Ton document "${doc.title}" a été rejeté : ${reason}`,
      link: `/dashboard/my-documents`,
    },
  });

  revalidatePath("/admin/moderation");
  return { success: true };
}

async function maybeAwardBadges(userId: string) {
  const user = await db.user.findUniqueOrThrow({
    where: { id: userId },
    include: {
      _count: { select: { documents: { where: { status: "APPROVED" } } } },
    },
  });

  const approvedCount = user._count.documents;
  const thresholds: [number, string][] = [
    [1, "First Contribution"],
    [10, "Active Contributor"],
    [100, "100 Documents"],
  ];

  for (const [threshold, badgeName] of thresholds) {
    if (approvedCount >= threshold) {
      const badge = await db.badge.upsert({
        where: { name: badgeName },
        create: { name: badgeName, description: `Décroché pour avoir partagé ${threshold} document(s)` },
        update: {},
      });

      await db.userBadge.upsert({
        where: { userId_badgeId: { userId, badgeId: badge.id } },
        create: { userId, badgeId: badge.id },
        update: {},
      });
    }
  }
}
