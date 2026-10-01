"use client";

import React, { useState } from "react";
import { approveDocument, rejectDocument } from "@/app/actions/moderation";

export function ModerationCard({ document }: { document: any }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#2563EB] px-2.5 py-1 rounded-full mb-2">
            {document.type}
          </span>
          <h3 className="font-bold text-base text-[#1E293B]">{document.title}</h3>
          <p className="text-xs text-gray-500 mt-1">
            Module: <strong className="text-gray-700">{document.module?.name || "N/A"}</strong> · Proposé par{" "}
            <strong className="text-gray-700">{document.uploader?.username || "Étudiant"}</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await approveDocument(document.id);
            }}
            className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            ✓ Approuver
          </button>
          <button
            onClick={() => setRejecting(!rejecting)}
            className="px-3.5 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            ✕ Rejeter
          </button>
        </div>
      </div>

      {rejecting && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Motif du rejet (ex: Droits d'auteur, mauvaise qualité...)..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-rose-500"
          />
          <button
            disabled={!reason || busy}
            onClick={async () => {
              setBusy(true);
              await rejectDocument(document.id, reason);
            }}
            className="text-xs bg-rose-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-rose-700 disabled:opacity-50"
          >
            Confirmer le rejet
          </button>
        </div>
      )}
    </div>
  );
}
