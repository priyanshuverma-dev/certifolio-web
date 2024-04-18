import { auth } from "@/auth";
import db from "@/lib/db";
import { getUserById, getUserByUsername } from "@/lib/db-functions";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export async function POST(
  req: NextRequest,
  { params }: { params: { toEdit: string } }
) {
  try {
    // check payloads
    const body = await req.json();
    const { value } = body;
    const { toEdit } = params;
    if (!value) throw new Error("No value provided");
    if (!toEdit) throw new Error("No type provided");

    // check if user is logged in
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in to perform this action" },
        { status: 401 }
      );
    }

    // check if user exists
    const user = await getUserByUsername(session.user.username);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (toEdit === "name") {
      const err = z
        .string()
        .min(3, {
          message: "Name must be at least 3 characters long",
        })
        .max(32, {
          message: "Name must be longer than 32 characters",
        })
        .safeParse(value);

      if (!err.success) throw new Error(err.error.message);

      const updatedUser = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: value,
        },
      });

      return NextResponse.json({
        message: "Name changed",
        username: updatedUser.username,
      });
    }

    if (toEdit === "bio") {
      const err = z.string().max(160).safeParse(value);
      if (!err.success) throw new Error(err.error.message);

      const updatedUser = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          bio: value,
        },
      });

      return NextResponse.json({
        message: "Bio changed",
        username: updatedUser.username,
      });
    }

    if (toEdit === "private") {
      const val = value === "true" ? true : false;

      const updatedUser = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          private: val,
        },
      });

      return NextResponse.json({
        message: "Private changed",
        username: updatedUser.username,
      });
    }

    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  } catch (error: any) {
    console.log("[USER_PROFILE_EDIT_API]", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
