"use client";
import useFeeds from "@/hooks/use-feed";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { Clipboard, ClipboardCopy, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton";

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
    navigator.clipboard.writeText(cid);
    toast({
      title: "Copied to clipboard",
    });
  }

  return (
    <div className="py-2 h-full space-y-2">
      {data?.map((d) => (
        <div key={d.id} className="border-2 rounded-xl p-2 border-dashed">
          <div>
            <AspectRatio ratio={16 / 9}>
              <Image
                fill
                className="rounded-lg"
                src={`https://gateway.pinata.cloud/ipfs/${d.cid}`}
                alt={`${d.title}`}
              />
            </AspectRatio>
            <div>
              <p className="text-xl text-muted-foreground p-2">
                {d.title} By {d.id}
              </p>
            </div>
          </div>
          <div>
            <Button
              onClick={() => copyCid(d.cid)}
              className="w-full"
              variant={"secondary"}
            >
              <Clipboard className="p-1" /> Copy Cid
            </Button>
          </div>
          <div className="flex items-center justify-between p-2">
            View NFT
            <Link
              href={`/view?cid=${d.cid}`}
              className={cn(
                buttonVariants({ variant: "default", size: "icon" })
              )}
            >
              <ExternalLink />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSection;
