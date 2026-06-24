import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 },
      );
    }

    // Prepare data for ImgBB
    const imgBbForm = new FormData();
    imgBbForm.append("image", file);

    // Send to ImgBB API
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=f2f3f75de26957d089ecdb402788644c`,
      {
        method: "POST",
        body: imgBbForm,
      },
    );

    const data = await response.json();

    // If successful, return the direct image URL
    if (data.success) {
      return NextResponse.json({ url: data.data.display_url });
    } else {
      throw new Error(data.error?.message || "ImgBB upload failed");
    }
  } catch (error: unknown) {
    console.error("Upload Error:", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}
