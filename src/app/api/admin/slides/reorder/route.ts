import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Slide from "@/models/Slides";

type ReorderItem = {
  _id: string;
  order: number;
};

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body: ReorderItem[] = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid payload, expected an array" },
        { status: 400 }
      );
    }

    const bulkOps = body.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: item.order } },
      },
    }));

    await Slide.bulkWrite(bulkOps);

    return NextResponse.json({ message: "Slide order updated successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}