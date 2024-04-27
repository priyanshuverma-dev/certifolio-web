import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";

export default {
  events: {},
  providers: [
    Google({
      profile: (profile) => ({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
    }),
    Github({
      profile: (profile) => ({
        name: profile.name,
        email: profile.email,
        image: profile.avatar_url,
        bio: profile.bio,
      }),
    }),
  ],
} satisfies NextAuthConfig;
