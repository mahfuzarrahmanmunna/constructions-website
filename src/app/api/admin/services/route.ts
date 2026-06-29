// app/api/admin/services/route.ts

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Service from "@/models/Service";

// GET — সব services fetch (admin)
export async function GET(req: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";

    const query = isAdmin ? {} : { isActive: true };
    const services = await Service.find(query).sort({ type: 1, order: 1 });
    
    return NextResponse.json(services);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// POST — নতুন service add
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Auto-increment id
    const last = await Service.findOne().sort({ id: -1 });
    const newId = last ? last.id + 1 : 1;

    // Auto order within type
    const lastOfType = await Service.findOne({ type: body.type }).sort({ order: -1 });
    const newOrder = lastOfType ? lastOfType.order + 1 : 1;

    const service = await Service.create({
      ...body,
      id: newId,
      order: newOrder,
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}