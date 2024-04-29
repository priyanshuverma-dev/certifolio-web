import Link from "next/link";
import React from "react";

export default function Intro() {
  return (
    <section className="mt-20 flex items-center justify-center p-4 flex-col">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Certificates are <span className="text-blue-500">forever</span>
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 lg:w-[60%] text-center">
        CertiFolio is a decentralized platform that allows you to store your
        certificates securely on the Ipfs. It is a platform that provides a
        secure and reliable way to store and share your certificates with
        anyone, anywhere, anytime.
      </p>
      <div className="w-full m-4 flex justify-center items-center">
        <Link
          href="/auth"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Grab Your Certificates home
          </span>
        </Link>
      </div>
    </section>
  );
}
