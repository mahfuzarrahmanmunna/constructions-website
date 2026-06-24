import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Category from "@/models/Category";

// GET all categories
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find({}).sort({ order: 1 });

    return NextResponse.json(categories);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// CREATE new category
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const category = await Category.create(body);

    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    console.error("CATEGORY CREATE ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Server Error";

    // ✅ duplicate slug error handling
    if ((error as any)?.code === 11000) {
      return NextResponse.json(
        { message: "Slug already exists. Please use a unique slug." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}