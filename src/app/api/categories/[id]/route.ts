import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Category from "@/models/Category";
import mongoose from "mongoose";

type Params = {
  id: string;
};

// GET single category
export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// UPDATE category (name + icon)
export async function PUT(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updated = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// DELETE category
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}