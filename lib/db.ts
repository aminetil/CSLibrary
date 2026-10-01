import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createFallbackDb(): PrismaClient {
  const makeModel = (name: string) => {
    const model: any = new Proxy(
      async function () {
        return { id: `mock-${name}` };
      },
      {
        get(target, prop) {
          if (prop === "findMany") {
            return async () => [];
          }
          if (prop === "findUnique") {
            return async () => null;
          }
          if (prop === "findUniqueOrThrow") {
            return async (args: any) => ({
              id: args?.where?.id ?? `mock-${name}`,
              ...args?.data,
              _count: { documents: 0 },
            });
          }
          if (prop === "count") {
            return async () => 0;
          }
          if (prop === "create") {
            return async (args: any) => ({ id: `mock-${name}`, ...args?.data });
          }
          if (prop === "update") {
            return async (args: any) => ({ id: args?.where?.id ?? `mock-${name}`, ...args?.data });
          }
          if (prop === "upsert") {
            return async (args: any) => ({ id: args?.where?.id ?? `mock-${name}`, ...args?.data });
          }
          if (prop === "delete") {
            return async (args: any) => ({ id: args?.where?.id ?? `mock-${name}` });
          }
          if (prop === "createMany") {
            return async () => ({ count: 0 });
          }
          if (prop === "deleteMany") {
            return async () => ({ count: 0 });
          }
          if (prop === "aggregate") {
            return async () => ({ _count: 0 });
          }
          if (prop === "findFirst") {
            return async () => null;
          }

          return async () => ({ id: `mock-${name}` });
        },
      }
    );

    return model;
  };

  return {
    $transaction: async (operations: any[]) => operations,
    document: makeModel("document"),
    university: makeModel("university"),
    faculty: makeModel("faculty"),
    department: makeModel("department"),
    specialty: makeModel("specialty"),
    academicLevel: makeModel("academicLevel"),
    semester: makeModel("semester"),
    module: makeModel("module"),
    user: makeModel("user"),
    badge: makeModel("badge"),
    userBadge: makeModel("userBadge"),
    contribution: makeModel("contribution"),
    notification: makeModel("notification"),
  } as unknown as PrismaClient;
}

export const db =
  process.env.DATABASE_URL && globalForPrisma.prisma
    ? globalForPrisma.prisma
    : process.env.DATABASE_URL
      ? globalForPrisma.prisma ??
        new PrismaClient({
          log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
        })
      : createFallbackDb();

if (process.env.DATABASE_URL && process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
