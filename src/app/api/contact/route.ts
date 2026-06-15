import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

// GET ALL CONTACT MESSAGES
export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      contacts,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch messages",
      },
      {
        status: 500,
      }
    );
  }
}

// SAVE CONTACT MESSAGE
export async function POST(
  req: Request
) {
  try {

    await connectDB();

    const body = await req.json();

    const contact =
      await Contact.create(body);

    return NextResponse.json({
      success: true,
      contact,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit message",
      },
      {
        status: 500,
      }
    );
  }
}