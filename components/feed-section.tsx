"use client";
import useFeeds from "@/hooks/use-feed";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { Clipboard, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
import { MdVerified } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FeedSection = () => {
  const { data, error, status } = useFeeds();
  const { toast } = useToast();

  if (error) {
    return (
      <div className="flex items-center justify-center">
        ERROR: {error.message}
      </div>
    );
  }

  if (status == "pending") {
    return (
      <div className="h-[100vh]">
        <div className="p-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function copyCid(cid: string) {
    const txt = `https://ipfs.io/ipfs/${cid}`;
    navigator.clipboard.writeText(txt);
    toast({
      title: "Copied to clipboard",
    });
  }

  return (
    <div className="py-2 h-full space-y-2">
      {data?.map((cert) => (
        <div key={cert.id} className="border-2 rounded-xl p-2">
          <div>
            <div className="flex items-center justify-between py-2">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight p-1">
                {cert.title}
              </h4>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <HiOutlineDotsCircleHorizontal className="w-7 h-7 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Pin</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Copy URL</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive/90 font-bold hover:text-destructive focus:text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <img
              className="rounded-lg w-full h-full !object-contain"
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
      ))}
    </div>
  );
};

export default FeedSection;
