import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";

export default {
  events: {},
  providers: [
  Google,
  Github
  ],
} satisfies NextAuthConfig;
