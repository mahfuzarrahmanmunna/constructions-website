import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

// GET SINGLE PROJECT BY ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch project";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// UPDATE PROJECT (PATCH)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const project = await Project.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updates follow schema rules (e.g., enum status)
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update project";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// DELETE PROJECT
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete project";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
