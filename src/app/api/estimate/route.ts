import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Estimate from "@/models/Estimate";

// ═══════════════════════════════════════
// GET — Fetch all estimates (with filters)
// ═══════════════════════════════════════
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const filter: Record<string, string> = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [estimates, total] = await Promise.all([
      Estimate.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Estimate.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      estimates,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch estimates" },
      { status: 500 },
    );
  }
}

// ═══════════════════════════════════════
// POST — Create a new estimate
// ═══════════════════════════════════════
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { projectType, area, location, email, phone } = body;

    // Validate required fields
    if (!projectType || !area || !location || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const estimate = await Estimate.create(body);

    return NextResponse.json(
      {
        success: true,
        estimate,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.log(error);

    // Handle Mongoose validation errors
    if (
      error &&
      typeof error === "object" &&
      "errors" in error &&
      error.errors
    ) {
      const messages = Object.values(
        (error as { errors: Record<string, { message: string }> }).errors,
      ).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to submit estimate" },
      { status: 500 },
    );
  }
}

// ═══════════════════════════════════════
// PATCH — Partially update an estimate
// ═══════════════════════════════════════
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Estimate ID is required" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const estimate = await Estimate.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!estimate) {
      return NextResponse.json(
        { success: false, message: "Estimate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      estimate,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to update estimate" },
      { status: 500 },
    );
  }
}

// ═══════════════════════════════════════
// PUT — Fully replace an estimate
// ═══════════════════════════════════════
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Estimate ID is required" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const { projectType, area, location, email, phone } = body;

    if (!projectType || !area || !location || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const estimate = await Estimate.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!estimate) {
      return NextResponse.json(
        { success: false, message: "Estimate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      estimate,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to replace estimate" },
      { status: 500 },
    );
  }
}

// ═══════════════════════════════════════
// DELETE — Remove an estimate
// ═══════════════════════════════════════
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Estimate ID is required" },
        { status: 400 },
      );
    }

    const estimate = await Estimate.findByIdAndDelete(id);

    if (!estimate) {
      return NextResponse.json(
        { success: false, message: "Estimate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Estimate deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete estimate" },
      { status: 500 },
    );
  }
}
