import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Slide from "@/models/Slides";

// GET all slides
export async function GET() {
  try {
    await dbConnect();

    const slides = await Slide.find({}).sort({ order: 1 });

    return NextResponse.json(slides);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// CREATE new slide
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    // নতুন slide এর order সবচেয়ে শেষে রাখা হবে
    const count = await Slide.countDocuments();

    const slide = await Slide.create({
      ...body,
      order: body.order ?? count,
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}