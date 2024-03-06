import CenterContainer from "@/components/center-container";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, HomeIcon, StepBackIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const ViewPage = (props: Props) => {
  const cid = props.searchParams.cid;

  return (
    <CenterContainer>
      <div className="flex flex-col justify-between mx-2 h-screen space-y-2">
        <div>
          <div className="flex flex-row justify-between">
            <Link
              href={"/"}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                }),
                "m-2"
              )}
            >
              <ChevronLeftIcon />
            </Link>
            <div className="p-2">
              <Button variant={"destructive"}>Report</Button>
            </div>
          </div>
          <Separator />
        </div>
        <div>
          <div className="p-2 flex items-center">
            <AspectRatio ratio={16 / 9}>
              <Image
                fill
                className="rounded-lg"
                src={`https://gateway.pinata.cloud/ipfs/${cid}`}
                alt={`${cid}`}
              />
            </AspectRatio>
          </div>
          <Separator />
          <p className="text-xl text-muted-foreground m-2">
            The file is saved on IPFS. we do not store this on any centralized
            server. Every file uploaded to our website is purely decentralized.
          </p>
        </div>
        <div>
          <Separator />
          <p className="text-sm text-muted-foreground m-2">
            The InterPlanetary File System (IPFS) is a set of composable,
            peer-to-peer protocols for addressing, routing, and transferring
            content-addressed data in a decentralized file system. Many popular
            Web3 projects are built on IPFS.
          </p>
          <Separator />
        </div>
      </div>
    </CenterContainer>
  );
};

export default ViewPage;
