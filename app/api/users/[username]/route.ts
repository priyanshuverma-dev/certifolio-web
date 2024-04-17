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
      return NextResponse.json({ message: "No User Found" }, { status: 404 });
    }

    const userCertificates = await db.certificate.count({
      where: {
        userId: user.id,
        isPublic: true,
      },
    });

    return NextResponse.json({ ...user, totalCertificates: userCertificates });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 501 });
  }
}
