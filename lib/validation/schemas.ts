import { z } from "zod";

export const documentTypeEnum = z.enum([
  "EXAM",
  "CORRECTION",
  "TD",
  "TP",
  "COURSE",
  "SUMMARY",
  "EXERCISE",
  "PROJECT",
  "LICENCE_PROJECT",
  "MASTER_THESIS",
  "RESEARCH_PAPER",
  "OTHER",
]);

export const reportReasonEnum = z.enum([
  "COPYRIGHT",
  "WRONG_CONTENT",
  "DUPLICATE",
  "INAPPROPRIATE",
  "OTHER",
]);

export const uploadUrlSchema = z.object({
  fileName: z.string().min(1, "Nom de fichier requis"),
  fileSize: z.number().max(50 * 1024 * 1024, "La taille maximale est de 50 Mo"),
  mimeType: z.enum(["application/pdf"]),
});

export const createDocumentSchema = z.object({
  key: z.string().min(1),
  fileHash: z.string().length(64, "Le hash SHA-256 doit comporter exactement 64 caractères"),
  fileSize: z.number().positive(),
  title: z.string().min(3, "Le titre doit comporter au moins 3 caractères").max(200),
  description: z.string().max(2000).optional(),
  moduleId: z.string().min(1),
  type: documentTypeEnum,
  academicYear: z.string().regex(/^\d{4}-\d{4}$/, "Format attendu: YYYY-YYYY").optional(),
});

export const searchFilterSchema = z.object({
  q: z.string().optional(),
  universityId: z.string().optional(),
  type: documentTypeEnum.optional(),
  sort: z.enum(["relevance", "recent", "downloads", "rating"]).default("relevance"),
  page: z.number().int().positive().default(1),
});

export const reportDocumentSchema = z.object({
  documentId: z.string().min(1),
  reason: reportReasonEnum,
  details: z.string().max(1000).optional(),
});
