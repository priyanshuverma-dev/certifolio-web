import React from "react";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="my-2 px-4 flex flex-col mb-10">
      <Separator className="my-2" />
      <div className="flex flex-col md:justify-between md:flex-row mb-2">
        <aside className="flex items-center  gap-[2px]">
          <p className="text-3xl font-bold scroll-m-20 border-b">Certi</p>
          <Image
            src="/images/f.png"
            alt="f"
            is="f"
            width={15}
            height={15}
            className="shadow-sm"
          />
          <p className="text-3xl font-bold scroll-m-20 border-b">lio ⭐</p>
        </aside>
        <aside className="flex flex-wrap justify-start py-2  md:justify-center ">
          <Link className="mx-2 hover:underline" href={"/howitworks"}>
            How It works
          </Link>
          <Link className="mx-2 hover:underline" href={"/about"}>
            About Us
          </Link>
          <Link className="mx-2 hover:underline" href={"https://ipfs.io"}>
            Open-Source
          </Link>
          <Link className="mx-2 hover:underline" href={"/privacy"}>
            Privacy Policy
          </Link>

          <Link className="mx-2 hover:underline" href={"/terms"}>
            Terms of Service
          </Link>
        </aside>
        <aside className="sm:flex flex-wrap justify-center hidden">
          <Link
            className="mx-2 hover:underline"
            href={"https://github.com/priyanshuverma-dev"}
            target="_blank"
          >
            <GithubIcon size={20} />
          </Link>
          <Link
            className="mx-2 hover:underline"
            href={"https://twitter.com/pvdev"}
            target="_blank"
          >
            <TwitterIcon size={20} />
          </Link>
        </aside>
      </div>

      <Separator />
      <div className="flex justify-center flex-col mb-2 min-[655px]:justify-between min-[655px]:flex-row">
        <aside>
          <p className="text-center mt-4">
            &copy; {new Date().getFullYear()} Certifolio. All rights reserved.
          </p>
        </aside>
        <aside className="text-center mt-4">
          <span className="text-center mt-4">
            Made with <span className="text-red-600 mr-1">❤</span>in India by{" "}
            <Link
              className="hover:underline text-blue-500"
              href={"https://p7u.tech"}
              target="_blank"
            >
              Priyanshu Verma
            </Link>
          </span>
        </aside>
      </div>
    </footer>
  );
}
