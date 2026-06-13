import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

type ReorderItem = {
  _id: string;
  sortOrder: number;
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
        update: { $set: { sortOrder: item.sortOrder } },
      },
    }));

    await Product.bulkWrite(bulkOps);

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}