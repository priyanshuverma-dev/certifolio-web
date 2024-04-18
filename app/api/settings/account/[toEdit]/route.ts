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

    if (toEdit === "username") {
      const err = z
        .string()
        .min(3)
        .regex(new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/))
        .parse(value);

      const currentDate = new Date();
      const lastUpdateDate = user.lastUsernameChangedAt || new Date(0);
      const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

      const isUsernameChanged = user.username === value;

      if (!isUsernameChanged) {
        if (
          currentDate.getTime() - lastUpdateDate.getTime() <
          sevenDaysInMilliseconds
        ) {
          return NextResponse.json(
            { message: "Username update is only allowed once every 7 days" },
            {
              status: 403,
            }
          );
        }
      }

      const userExists = await getUserByUsername(value);
      if (userExists) {
        return NextResponse.json(
          { message: "Username already exists" },
          { status: 400 }
        );
      }

      const updatedUser = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: value,
          lastUsernameChangedAt: currentDate,
        },
      });

      return NextResponse.json({
        message: "Username updated",
        user: updatedUser.username,
      });
    }

    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  } catch (error: any) {
    console.log("[USER_PROFILE_EDIT_API]", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
