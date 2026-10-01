import React from "react";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ModerationCard } from "@/components/admin/moderation-card";

export default async function ModerationPage() {
  let pending: any[] = [];
  try {
    pending = await db.document.findMany({
      where: { status: "PENDING" },
      include: {
        uploader: { select: { username: true } },
        module: {
          include: {
            semester: {
              include: {
                level: {
                  include: { specialty: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (err) {
    console.warn("Error fetching pending documents for moderation:", err);
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AdminSidebar currentPath="/admin/moderation" />
      <main className="flex-1 px-8 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1E293B]">
              File de modération ({pending.length})
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Examinez et validez les documents déposés par les étudiants.
            </p>
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <span className="text-4xl">🎉</span>
            <h3 className="text-base font-bold text-[#1E293B] mt-3">Aucun document en attente</h3>
            <p className="text-xs text-gray-500 mt-1">
              La file de modération est parfaitement à jour !
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((doc) => (
              <ModerationCard key={doc.id} document={doc} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
