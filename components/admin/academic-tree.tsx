"use client";

import React, { useState } from "react";
import { createNode, deleteNode, updateNode } from "@/app/actions/academic";

export type TreeNode = {
  id: string;
  name: string;
  type: string;
  children?: TreeNode[];
};

function Row({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(depth < 1);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(node.name);

  return (
    <div className="text-sm">
      <div
        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 group border-b border-gray-100/50"
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        {node.children && node.children.length > 0 ? (
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-400 hover:text-gray-600 w-4 h-4 flex items-center justify-center font-bold"
          >
            {open ? "▼" : "▶"}
          </button>
        ) : (
          <span className="w-4" />
        )}

        {editing ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={async () => {
              await updateNode(node.type, node.id, name);
              setEditing(false);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await updateNode(node.type, node.id, name);
                setEditing(false);
              }
            }}
            className="border border-[#2563EB] rounded px-2 py-0.5 text-sm outline-none"
          />
        ) : (
          <span className="font-medium text-[#1E293B]">{node.name}</span>
        )}

        <span className="text-[10px] text-gray-400 uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-full font-bold ml-1">
          {node.type}
        </span>

        <div className="ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-2">
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-gray-400 hover:text-[#2563EB] px-1"
            title="Modifier"
          >
            ✏️
          </button>
          <button
            onClick={() => setAdding(true)}
            className="text-xs text-gray-400 hover:text-[#2563EB] px-1"
            title="Ajouter un sous-élément"
          >
            ➕
          </button>
          <button
            onClick={async () => {
              if (confirm(`Supprimer "${node.name}" et tout son contenu ?`)) {
                await deleteNode(node.type, node.id);
              }
            }}
            className="text-xs text-gray-400 hover:text-red-500 px-1"
            title="Supprimer"
          >
            🗑️
          </button>
        </div>
      </div>

      {adding && (
        <InlineCreateForm
          depth={depth + 1}
          parentId={node.id}
          parentType={node.type}
          onDone={() => setAdding(false)}
        />
      )}

      {open &&
        node.children?.map((child) => (
          <Row key={child.id} node={child} depth={depth + 1} />
        ))}
    </div>
  );
}

function InlineCreateForm({
  depth,
  parentId,
  parentType,
  onDone,
}: {
  depth: number;
  parentId: string | null;
  parentType: string;
  onDone: () => void;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      style={{ paddingLeft: `${depth * 24 + 12}px` }}
      className="flex gap-2 py-2 items-center"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!value.trim()) return;
        await createNode(parentType, parentId, value.trim());
        onDone();
      }}
    >
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nouveau nom..."
        className="border border-gray-300 rounded-md px-3 py-1 text-sm flex-1 max-w-xs outline-none focus:border-[#2563EB]"
      />
      <button type="submit" className="text-xs bg-[#2563EB] text-white px-3 py-1 rounded-md font-semibold">
        Ajouter
      </button>
      <button type="button" onClick={onDone} className="text-xs text-gray-400 hover:text-gray-600">
        Annuler
      </button>
    </form>
  );
}

export function AcademicTree({ universities }: { universities: any[] }) {
  const tree: TreeNode[] = universities.map(buildUniversityNode);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      {tree.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-6">Aucune université configurée.</p>
      ) : (
        tree.map((node) => <Row key={node.id} node={node} depth={0} />)
      )}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <InlineCreateForm depth={0} parentId={null} parentType="root" onDone={() => {}} />
      </div>
    </div>
  );
}

function buildUniversityNode(u: any): TreeNode {
  return {
    id: u.id,
    name: u.name,
    type: "university",
    children: [
      ...(u.faculties || []).map(buildFacultyNode),
      ...(u.specialties || []).map(buildSpecialtyNode),
    ],
  };
}
function buildFacultyNode(f: any): TreeNode {
  return {
    id: f.id,
    name: f.name,
    type: "faculty",
    children: (f.departments || []).map(buildDeptNode),
  };
}
function buildDeptNode(d: any): TreeNode {
  return {
    id: d.id,
    name: d.name,
    type: "department",
    children: (d.specialties || []).map(buildSpecialtyNode),
  };
}
function buildSpecialtyNode(s: any): TreeNode {
  return {
    id: s.id,
    name: s.name,
    type: "specialty",
    children: (s.levels || []).map(buildLevelNode),
  };
}
function buildLevelNode(l: any): TreeNode {
  return {
    id: l.id,
    name: l.name,
    type: "level",
    children: (l.semesters || []).map(buildSemesterNode),
  };
}
function buildSemesterNode(s: any): TreeNode {
  return {
    id: s.id,
    name: s.name,
    type: "semester",
    children: (s.modules || []).map((m: any) => ({
      id: m.id,
      name: m.name,
      type: "module",
    })),
  };
}
