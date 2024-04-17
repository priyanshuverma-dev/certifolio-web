import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google({
      profile: (profile) => ({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        username: profile.email.split("@")[0].replaceAll(".", "_"),
      }),
    }),
    Github({
      profile: (profile) => ({
        name: profile.name,
        email: profile.email,
        image: profile.avatar_url,
        username: profile.login.replaceAll(".", "_"),
        bio: profile.bio,
      }),
    }),
  ],
} satisfies NextAuthConfig;
