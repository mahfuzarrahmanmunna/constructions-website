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

    const body = await req.json();

    // Server-side validation — required fields must be present.
    // Returns 400 with success:false so the frontend never treats a
    // bad submission as a success.
    const { name, email, subject, message } = body ?? {};
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide your name, email, subject and message.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    // TODO: in addition to persisting, optionally email the team
    // (nodemailer is already installed) once a mechanism is chosen.
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