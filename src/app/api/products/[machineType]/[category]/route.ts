import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

type Params = {
  machineType: string;
  category: string;
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  try {

    await dbConnect();

    const { machineType, category } =
      await params;

    const products = await Product.find({
      machineType,
      category,
    });

    return NextResponse.json(products);

  } catch (error: unknown) {

    const message =
      error instanceof Error
        ? error.message
        : "Server Error";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}