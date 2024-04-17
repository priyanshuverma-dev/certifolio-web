import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <header className="fixed right-0 left-0 top-0 p-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center justify-between border-b-[1px] border-neutral-900">
        <aside className="flex items-center gap-[2px]">
          <p className="text-3xl font-bold">Certi</p>
          <Image
            src="/images/f.png"
            alt="f"
            width={15}
            height={15}
            className="shadow-sm"
          />
          <p className="text-3xl font-bold">lio</p>
        </aside>
        <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
          <ul className="flex items-center gap-4 list-none">
            <li>
              <Link href={"/howitworks"}>How It works</Link>
            </li>
            <li>
              <Link href={"/about"}>About Us</Link>
            </li>
            <li>
              <Link href={"https://github.com/certifolio"}>Open-Source</Link>
            </li>
          </ul>
        </nav>
        <aside className="flex items-center gap-4">
          <Link
            href="/auth"
            className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              {session ? `Dashboard` : "Get Started"}
            </span>
          </Link>
        </aside>
      </header>
    </>
  );
}
