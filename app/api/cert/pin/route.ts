import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cid } = await req.json();

    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const checkPinnedCerts = await db.certificate.findMany({
      where: { cid, userId: session.user.id, pinned: true },
    });

    if (checkPinnedCerts.length > 0) {
      throw new Error("Certificate already pinned");
    }

    const checkPinnedCertsCount = await db.certificate.count({
      where: { userId: session.user.id, pinned: true },
    });

    if (checkPinnedCertsCount >= 5) {
      throw new Error("You can only pin 5 certificates");
    }

    const pin = await db.certificate.update({
      where: { cid, userId: session.user.id },
      data: { pinned: true },
    });

    return NextResponse.json({ message: "Certificate pinned", certId: pin.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
