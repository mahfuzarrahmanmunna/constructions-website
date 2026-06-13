/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse }
from "next/server";

import { connectDB }
from "@/lib/mongodb";

import Inquiry
from "@/models/Inquiry";



// UPDATE
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    await connectDB();

    const { id } =
      await params;

    const body =
      await req.json();

    const inquiry =
      await Inquiry.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      inquiry,
    });

  } catch (error: any) {

    console.log(
      "PUT ERROR:",
      error
    );

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



// DELETE
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    await connectDB();

    const { id } =
      await params;

    await Inquiry.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {

    console.log(
      "DELETE ERROR:",
      error
    );

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
