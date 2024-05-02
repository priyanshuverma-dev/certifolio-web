import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const {
      title,
      cid,
      isPublic,
      credentialId,
      description,
      issuer,
      verifyUrl,
    } = await req.json();

    const existRecord = await db.certificate.findUnique({
      where: {
        cid,
        userId: session.user.id,
      },
    });

    if (!existRecord) {
      return NextResponse.json(
        { message: `This credential is not minted by you` },
        { status: 400 }
      );
    }

    const updateRecord = await db.certificate.update({
      where: {
        id: existRecord.id,
        userId: session.user.id,
      },
      data: {
        title,
        isPublic,
        credentialId,
        description,
        issuer,
        verifyUrl,
      },
    });

    if (!updateRecord) {
      return NextResponse.json(
        { message: "can't update record" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Record updated" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
