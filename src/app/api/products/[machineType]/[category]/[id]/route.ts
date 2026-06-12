import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

type Params = {
  machineType: string;
  category: string;
  id: string;
};

export async function GET(
  _req: Request,
  { params }: { params: Params }
) {
  try {
    await dbConnect();

    const { machineType, category, id } = await params;

    const product = await Product.findOne({
      productId: Number(id),
      machineType,
      category,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}