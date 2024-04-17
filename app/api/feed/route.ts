import { auth } from "@/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user!.email!,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const certificates = await db.certificate.findMany({
      where: {
        userId: user.id,
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
        isPublic: true,
        pinned: true,
        verifyUrl: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            certificatesCategories: true,
          },
        },
      },
    });

    const payload = certificates;

    return NextResponse.json({
      payload,
    });
  } catch (error: any) {
    console.log("[ERROR_FEED_ROUTE]: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
