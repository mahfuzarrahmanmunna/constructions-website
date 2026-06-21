import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Estimate from "@/models/Estimate";

// GET single estimate
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const estimate = await Estimate.findById(id);
    if (!estimate) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, estimate });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch" },
      { status: 500 },
    );
  }
}

// PATCH — update status, cost, notes
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const estimate = await Estimate.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!estimate) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, estimate });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to update" },
      { status: 500 },
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const estimate = await Estimate.findByIdAndDelete(id);

    if (!estimate) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete" },
      { status: 500 },
    );
  }
}
