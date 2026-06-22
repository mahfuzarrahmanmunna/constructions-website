import { headers } from "next/headers";
import { adminAuth } from "./firebase-admin";

export async function verifyAdmin() {
  const authorization = (await headers()).get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authorization.split("Bearer ")[1];

  const decodedToken = await adminAuth.verifyIdToken(token);

  if (decodedToken.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Forbidden");
  }

  return decodedToken;
}