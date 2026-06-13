import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();

  return NextResponse.json({
    success: true,
    message: "Database Connected",
  });
}