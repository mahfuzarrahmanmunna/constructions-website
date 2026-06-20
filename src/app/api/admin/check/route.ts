import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();

    const admin = await Admin.findOne({ email });

    return NextResponse.json({
      isAdmin: !!admin,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { isAdmin: false },
      { status: 500 }
    );
  }
}