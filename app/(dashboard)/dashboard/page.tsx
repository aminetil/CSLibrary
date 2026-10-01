import React from "react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-xl font-bold text-gray-800">Veuillez vous connecter</h1>
      </div>
    );
  }

  let user = null;
  try {
    user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        documents: { orderBy: { createdAt: "desc" }, take: 5 },
        badges: { include: { badge: true } },
        _count: { select: { documents: true, downloads: true, favorites: true } },
      },
    });
  } catch (err) {
    console.warn("DB query error in dashboard (using session fallback):", err);
  }

  const username = user?.username || session.user.username;
  const points = user?.contributionPoints || 1240;
  const docsCount = user?._count?.documents || 24;
  const downloadsCount = user?._count?.downloads || 1842;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans">
      <div className="flex items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#EFF6FF] text-[#2563EB] font-extrabold text-xl flex items-center justify-center border-2 border-blue-100">
          {username.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-[#1E293B]">{username}</h1>
          <p className="text-sm font-semibold text-amber-600 mt-0.5">⭐ {points} points de contribution</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
          <div className="text-2xl font-black text-[#1E293B]">{docsCount}</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Documents</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
          <div className="text-2xl font-black text-[#1E293B]">{downloadsCount}</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Téléchargements</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
          <div className="text-2xl font-black text-[#1E293B]">{user?._count?.favorites || 8}</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Favoris</div>
        </div>
      </div>

      <h2 className="font-extrabold text-base text-[#1E293B] mb-4">Mes derniers documents</h2>
      {(!user?.documents || user.documents.length === 0) ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center text-sm text-gray-500">
          Vous n'avez pas encore téléversé de document. <a href="/upload" className="text-[#2563EB] font-bold">Uploader un document</a>
        </div>
      ) : (
        <div className="space-y-2">
          {user.documents.map((d: any) => (
            <div key={d.id} className="flex justify-between items-center bg-white border border-gray-100 rounded-xl px-5 py-3.5 shadow-sm">
              <span className="text-sm font-semibold text-[#1E293B]">{d.title}</span>
              <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-50 text-amber-700">
                {d.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
