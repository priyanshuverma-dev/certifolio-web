import React from "react";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type Props = {
  cert: Certificate;
};

function ProfileCertCard({ cert }: Props) {
  return (
    <div key={cert.id} className="border-2 rounded-xl p-2">
      <div>
        <div className="flex items-center justify-between py-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight p-1">
            {cert.title} {cert.pinned && "📌"}
          </h4>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HiOutlineDotsCircleHorizontal className="w-7 h-7 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive/90 font-bold hover:text-destructive focus:text-destructive">
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Image
          width={500}
          height={500}
          className="rounded-lg !w-full !h-full !object-contain"
          src={`https://gateway.pinata.cloud/ipfs/${cert.cid}`}
          alt={`${cert.title} by ${cert.issuer}`}
        />
        <div className="py-2 flex flex-col">
          <Link
            target={cert.verifyUrl ? "_blank" : "_self"}
            href={cert.verifyUrl ? cert.verifyUrl : "#"}
            className="flex items-center justify-start"
          >
            <span className="text-sm text-muted-foreground">
              ISSUED BY: {cert.issuer}
            </span>
            {cert.verifyUrl && (
              <MdVerified className="ml-1 scale-80 text-green-600" />
            )}
          </Link>
          <div>
            <small className="text-sm font-medium leading-none">
              {cert.description}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCertCard;
