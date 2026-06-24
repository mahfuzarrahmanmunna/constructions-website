import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Slide from "@/models/Slides";
import mongoose from "mongoose";

type Params = {
  id: string;
};

// GET single slide
export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid slide ID" },
        { status: 400 }
      );
    }

    const slide = await Slide.findById(id);

    if (!slide) {
      return NextResponse.json(
        { message: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(slide);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// UPDATE slide
export async function PUT(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid slide ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updated = await Slide.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// DELETE slide
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid slide ID" },
        { status: 400 }
      );
    }

    const deleted = await Slide.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Slide deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}