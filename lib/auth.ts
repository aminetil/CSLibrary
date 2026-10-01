export type UserSession = {
  user: {
    id: string;
    email: string;
    username: string;
    role: "STUDENT" | "CONTRIBUTOR" | "ADMIN";
    emailVerified?: Date | null;
  };
};

export async function auth(): Promise<UserSession | null> {
  // Production Auth.js session mock handler / integration point
  if (process.env.NODE_ENV === "test") return null;

  return {
    user: {
      id: "usr_mock_student_123",
      email: "amin.mahieddine@univ-annaba.dz",
      username: "Amin Mahieddine",
      role: "STUDENT",
      emailVerified: new Date(),
    },
  };
}

export async function requireAdminSession(): Promise<UserSession> {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Accès refusé : privilèges Administrateur requis");
  }
  return session;
}
