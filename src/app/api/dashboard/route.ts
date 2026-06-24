import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Inquiry from "@/models/Inquiry";

export async function GET(request: Request) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 },
      );
    }

    const token = authHeader.split("Bearer ")[1];

    // Pass token to verifyAdmin
    const decodedToken = await verifyAdmin(token);

    if (!decodedToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid token" },
        { status: 401 },
      );
    }

    await connectDB();

    const totalProducts = await Product.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();

    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentInquiries = await Inquiry.find()
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
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
}
