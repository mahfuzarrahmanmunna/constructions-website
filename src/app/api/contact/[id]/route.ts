import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function DELETE(
  req: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    await connectDB();

    const { id } =
      await params;

    await Contact.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}