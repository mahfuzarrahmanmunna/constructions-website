import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

// GET ALL PROJECTS
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const status = searchParams.get("status");

    // Build filter - ONLY filter if params are explicitly passed
    const filter: Record<string, unknown> = {};

    // Only filter by status if ?status=published is in the URL
    if (status && status !== "all") {
      filter.status = status;
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch projects";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// CREATE A NEW PROJECT
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const project = await Project.create(body);

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
