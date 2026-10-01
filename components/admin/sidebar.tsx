import React from "react";

const NAV_ITEMS = [
  { href: "/admin/overview", label: "Vue d'ensemble", icon: "📊" },
  { href: "/admin/moderation", label: "Modération", icon: "🛡️" },
  { href: "/admin/users", label: "Utilisateurs", icon: "👥" },
  { href: "/admin/academic-structure", label: "Structure académique", icon: "🎓" },
  { href: "/admin/analytics", label: "Analytique", icon: "📈" },
];

export function AdminSidebar({ currentPath }: { currentPath?: string }) {
  return (
    <aside className="w-60 border-r border-gray-200 bg-white px-3 py-6 min-h-screen flex flex-col justify-between">
      <div>
        <div className="px-3 mb-8 font-extrabold text-[#1E293B] text-lg flex items-center gap-2">
          <span>🎓</span> DocStudy Admin
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors font-medium ${
                  active
                    ? "bg-[#2563EB]/10 text-[#2563EB] font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="px-3 pt-4 border-t border-gray-100">
        <a href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700">
          ← Retour au site public
        </a>
      </div>
    </aside>
  );
}
