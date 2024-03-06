import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/providers/auth-provider";
import { auth } from "@/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/query";
import { cn } from "@/lib/utils";

const inter = Rubik({ subsets: ["latin"] });

const title =
  "CertiFolio - Showcase Your Certificates and Achievements on IPFS";
const description =
  "CertiFolio is a platform where users can securely upload, showcase, and verify their certificates and achievements on the InterPlanetary File System (IPFS).";

export const metadata: Metadata = {
  title: title,
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
        <body className={cn(inter.className, "")}>
          <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
          <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
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
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
