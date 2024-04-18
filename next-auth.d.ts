import NextAuth, { type DefaultSession } from "next-auth";
import { OnBoard } from "./types";

export type ExtendedUser = DefaultSession["user"] & {
  username: string;
  id: string;
  onboard: OnBoard;
  emailVerified: Date | null;
  lastUsernameChangedAt: Date | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
