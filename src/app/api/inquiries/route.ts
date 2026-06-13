/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse }
from "next/server";

import { connectDB }
from "@/lib/mongodb";

import Inquiry
from "@/models/Inquiry";



// GET ALL
export async function GET() {

  try {

    await connectDB();

    const inquiries =
      await Inquiry.find()
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      inquiries,
    });

  } catch (error: any) {

    console.log("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}



// CREATE
export async function POST(req: Request) {
  try {
    console.log("POST HIT");

    await connectDB();

    console.log("DB CONNECTED");

    const body = await req.json();

    console.log(body);

    const inquiry = await Inquiry.create(body);

    return NextResponse.json({
      success: true,
      inquiry,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}
