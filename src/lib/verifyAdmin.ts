import { getAdminAuth } from "@/lib/firebase-admin";

export async function verifyAdmin(token: string) {
  const auth = getAdminAuth();

  // If Firebase admin isn't configured, block access
  if (!auth) {
    console.error("Admin auth is not configured.");
    return null;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
