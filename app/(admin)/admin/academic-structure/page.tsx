import React from "react";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AcademicTree } from "@/components/admin/academic-tree";

export default async function AcademicStructurePage() {
  let universities: any[] = [];
  try {
    universities = await db.university.findMany({
      include: {
        faculties: {
          include: {
            departments: {
              include: {
                specialties: {
                  include: {
                    levels: {
                      include: {
                        semesters: {
                          include: { modules: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        specialties: {
          include: {
            levels: {
              include: {
                semesters: {
                  include: { modules: true },
                },
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.warn("Error loading universities for academic tree (using mock fallback):", err);
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AdminSidebar currentPath="/admin/academic-structure" />
      <main className="flex-1 px-8 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1E293B]">Structure académique</h1>
            <p className="text-xs text-gray-500 mt-1">
              Gérez les Universités, Facultés, Départements, Spécialités et Modules.
            </p>
          </div>
        </div>

        <AcademicTree universities={universities} />
      </main>
    </div>
  );
}
