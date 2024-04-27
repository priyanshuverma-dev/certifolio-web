"use client";
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
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

type Props = {
  cert: Certificate;
};

function CertCard({ cert }: Props) {
  const qc = useQueryClient();
  const handleDelete = async () => {};
  const handleCopyUrl = async () => {
    navigator.clipboard.writeText(
      `https://gateway.pinata.cloud/ipfs/${cert.cid}`
    );
  };

  const handlePin = async () => {
    try {
      const res = await fetch("/api/cert/pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cid: cert.cid }),
      });
      const data = await res.json();
      if (res.status != 200) throw new Error(data.error);

      await qc.invalidateQueries({
        queryKey: ["feeds"],
      });
      toast.success("Certificate pinned");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };
  const handleUnpin = async () => {
    try {
      const res = await fetch("/api/cert/unpin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cid: cert.cid }),
      });
      const data = await res.json();
      if (res.status != 200) throw new Error(data.error);
      await qc.invalidateQueries({
        queryKey: ["feeds"],
      });
      toast.success("Certificate unpinned");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };
  const handleEdit = async () => {};

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
              {cert.pinned ? (
                <DropdownMenuItem onClick={handleUnpin}>Unpin</DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handlePin}>Pin</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyUrl}>
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive/90 font-bold hover:text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Image
          width={500}
          height={500}
          className="rounded-lg !w-full !h-full !object-contain"
          src={`https://gateway.pinata.cloud/ipfs/${cert.cid}`}
          alt={`${cert.title} by ${cert.user.username}`}
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

export default CertCard;
