import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import SiteSettings from "@/models/SiteSettings";

// GET settings
export async function GET() {
  try {
    await dbConnect();

    let settings = await SiteSettings.findOne({});

   
    if (!settings) {
      settings = await SiteSettings.create({
        navbarLinks: [
          { label: "Home", link: "/" },
          { label: "Products", link: "/products" },
          { label: "About Us", link: "/about" },
          { label: "Contact", link: "/contact" },
        ],
        contactInfo: {
          phone: "+880 1XXX-XXXXXX",
          email: "info@example.com",
          address: "Chittagong, Bangladesh",
        },
        socialMedia: {
          facebook: "",
          twitter: "",
          linkedin: "",
          youtube: "",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// UPDATE settings
export async function PUT(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    let settings = await SiteSettings.findOne({});

    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(
        settings._id,
        body,
        { new: true, runValidators: true }
      );
    }

    return NextResponse.json(settings);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}