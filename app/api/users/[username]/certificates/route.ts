import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;

    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const certificates = await db.certificate.findMany({
      where: {
        userId: user.id,
        isPublic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        cid: true,
        title: true,
        description: true,
        category: true,
        credentialId: true,
        issuer: true,
        pinned: true,
        verifyUrl: true,
        createdAt: true,
      },
    });

    if (certificates.length == 0) {
      return NextResponse.json(
        { message: "No certificates found" },
        { status: 404 }
      );
    }

    return NextResponse.json(certificates);
  } catch (error: any) {
    console.log("[ERROR_FEED_ROUTE]: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
