import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "To, subject, and message are required" },
        { status: 400 },
      );
    }

    // ═══ Validate SMTP config exists ═══
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.error(
        "SMTP configuration is missing. Check your .env.local file.",
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured. Please add SMTP_HOST, SMTP_USER, and SMTP_PASS to your .env.local file.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Connection timeout to fail fast instead of hanging
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });

    // Test connection first
    await transporter.verify();

    await transporter.sendMail({
      from: `"CPL Construction" <${process.env.SMTP_USER}>`,
      to,
      replyTo: process.env.SMTP_USER,
      subject,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
          <div style="background: #002253; padding: 24px 32px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.1em;">CPL CONSTRUCTION</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 13px;">Cost Estimate Response</p>
          </div>
          <div style="padding: 32px;">
            ${message}
          </div>
          <div style="background: #f3f4f6; padding: 16px 32px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">
              This email was sent from CPL Construction Admin Dashboard.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: unknown) {
    const err = error as Error & { code?: string };
    console.error("Email error:", err.message);

    // Return specific error messages
    if (err.code === "ESOCKET" || err.code === "ECONNREFUSED") {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot connect to SMTP server at ${process.env.SMTP_HOST || "NOT SET"}:${process.env.SMTP_PORT || "587"}. Check SMTP_HOST in .env.local`,
        },
        { status: 500 },
      );
    }

    if (err.code === "EAUTH") {
      return NextResponse.json(
        {
          success: false,
          message:
            "SMTP authentication failed. Check SMTP_USER and SMTP_PASS in .env.local. If using Gmail, you need an App Password.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 },
    );
  }
}
