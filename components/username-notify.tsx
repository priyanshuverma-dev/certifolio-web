import { auth } from "@/auth";
import Link from "next/link";
import React from "react";

const UsernameNotify = async () => {
  const session = await auth();

  if (!session) return null;

  if (session.user.lastUsernameChangedAt == null) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 012 0v5a1 1 0 01-2 0V6zm0 7a1 1 0 012 0 1 1 0 01-2 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <span className="text-sm leading-5 text-yellow-700">
              You haven&apos;t set a username yet. You can set a username in
              your profile{" "}
              <Link
                href={"/main/settings?selected=Account"}
                className="underline"
              >
                settings
              </Link>
              .
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UsernameNotify;
