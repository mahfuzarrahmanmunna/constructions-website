import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Inquiry from "@/models/Inquiry";

export async function GET() {
  try {
    await connectDB();

    const totalProducts =
      await Product.countDocuments();

    const totalInquiries =
      await Inquiry.countDocuments();

    const recentProducts =
      await Product.find()
        .sort({ createdAt: -1 })
        .limit(5);

    const recentInquiries =
      await Inquiry.find()
        .sort({ createdAt: -1 })
        .limit(5);

    return NextResponse.json({
      success: true,
      totalProducts,
      totalInquiries,
      recentProducts,
      recentInquiries,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}