// app/api/admin/services/[id]/route.ts

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Service from "@/models/Service";

type Params = { id: string };

// GET single
export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const service = await Service.findOne({ id: Number(id) });
    if (!service)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(service);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// PUT — update
export async function PUT(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const updated = await Service.findOneAndUpdate(
      { id: Number(id) },
      body,
      { new: true, runValidators: true }
    );

    if (!updated)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await Service.findOneAndDelete({ id: Number(id) });
    if (!deleted)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}