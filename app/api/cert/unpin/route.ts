import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cid } = await req.json();

    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const checkPinnedCerts = await db.certificate.count({
      where: { cid, userId: session.user.id },
    });

    if (checkPinnedCerts == 0) {
      throw new Error("Certificate not pinned");
    }

    const pin = await db.certificate.update({
      where: { cid, userId: session.user.id },
      data: { pinned: false },
    });

    return NextResponse.json({
      message: "Certificate unpinned",
      certId: pin.id,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
