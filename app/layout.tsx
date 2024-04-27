import type { Metadata } from "next";
import { Rubik, DM_Sans } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/providers/auth-provider";
import { auth } from "@/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/query";
import { cn } from "@/lib/utils";
import ModalsProvider from "@/providers/modals";

const fonts = DM_Sans({ subsets: ["latin"] });

const title =
  "CertiFolio - Showcase Your Certificates and Achievements on IPFS";
const description =
  "CertiFolio is a platform where users can securely upload, showcase, and verify their certificates and achievements on the InterPlanetary File System (IPFS).";

export const metadata: Metadata = {
  title: {
    template: "%s | CertiFolio",
    default: title,
  },
  description: description,
  openGraph: {
    title: title,
    description: description,
    type: "website",
    url: "https://certifolio.p7u.tech",
  },
  twitter: {
    title,
    description,
  },
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <AuthProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            fonts.className,
            "bg-gradient-to-r dark:from-slate-900 dark:to-stone-800 from-slate-50 to-stone-200"
          )}
        >
          <QueryProvider>
            <NextTopLoader
              showSpinner
              template='<div class="bar" role="bar"><div class="peg"></div></div>
                <div class="spinner" role="spinner"><div class="spinner-icon fixed bottom-0 right-0 m-2"></div></div>'
            />
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
              {modal}
              <Toaster />
              <ModalsProvider />
            </ThemeProvider>
          </QueryProvider>
          {/* // !TODO: <Analytics /> */}
        </body>
      </html>
    </AuthProvider>
  );
}
