import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { type, name, email, phone, city, state, projectType, dumpsterSize, message, source } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        type: type || "quote",
        name,
        email,
        phone,
        city,
        state,
        projectType,
        dumpsterSize,
        message,
        source,
      },
    });

    // Send email notification (don't fail if email fails)
    try {
      await sendLeadNotification({
        name,
        email,
        phone,
        city,
        state,
        projectType,
        dumpsterSize,
        message,
        source,
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
    }

    return NextResponse.json(
      { success: true, id: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Simple admin endpoint to list leads (add auth in production)
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    const leads = await prisma.lead.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
