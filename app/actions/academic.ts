"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function levelOrder(name: string): number {
  const map: Record<string, number> = { L1: 1, L2: 2, L3: 3, M1: 4, M2: 5 };
  return map[name] ?? 99;
}

export async function createNode(parentType: string, parentId: string | null, name: string) {
  const slug = slugify(name);

  switch (parentType) {
    case "root":
      await db.university.create({ data: { name, slug } });
      break;
    case "university":
      await db.faculty.create({ data: { name, slug, universityId: parentId! } });
      break;
    case "faculty":
      await db.department.create({ data: { name, slug, facultyId: parentId! } });
      break;
    case "department":
      await db.specialty.create({ data: { name, slug, departmentId: parentId! } });
      break;
    case "specialty":
      await db.academicLevel.create({
        data: { name, order: levelOrder(name), specialtyId: parentId! },
      });
      break;
    case "level":
      await db.semester.create({ data: { name, levelId: parentId! } });
      break;
    case "semester":
      await db.module.create({ data: { name, slug, semesterId: parentId! } });
      break;
    default:
      throw new Error(`Type de parent inconnu: ${parentType}`);
  }

  revalidatePath("/admin/academic-structure");
  return { success: true };
}

export async function updateNode(type: string, id: string, name: string) {
  const slug = slugify(name);

  if (type === "university") {
    await db.university.update({ where: { id }, data: { name, slug } });
  } else if (type === "faculty") {
    await db.faculty.update({ where: { id }, data: { name, slug } });
  } else if (type === "department") {
    await db.department.update({ where: { id }, data: { name, slug } });
  } else if (type === "specialty") {
    await db.specialty.update({ where: { id }, data: { name, slug } });
  } else if (type === "level") {
    await db.academicLevel.update({ where: { id }, data: { name } });
  } else if (type === "semester") {
    await db.semester.update({ where: { id }, data: { name } });
  } else if (type === "module") {
    await db.module.update({ where: { id }, data: { name, slug } });
  }

  revalidatePath("/admin/academic-structure");
  return { success: true };
}

export async function deleteNode(type: string, id: string) {
  if (type === "university") {
    await db.university.delete({ where: { id } });
  } else if (type === "faculty") {
    await db.faculty.delete({ where: { id } });
  } else if (type === "department") {
    await db.department.delete({ where: { id } });
  } else if (type === "specialty") {
    await db.specialty.delete({ where: { id } });
  } else if (type === "level") {
    await db.academicLevel.delete({ where: { id } });
  } else if (type === "semester") {
    await db.semester.delete({ where: { id } });
  } else if (type === "module") {
    await db.module.delete({ where: { id } });
  }

  revalidatePath("/admin/academic-structure");
  return { success: true };
}
