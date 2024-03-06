import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const AddCredentialSection = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col m-2 p-2 rounded-xl">
      <div className="items-center flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>{session?.user?.name?.at(0)}</AvatarFallback>
          </Avatar>
        </div>
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href={"/new"}
        >
          Create
        </Link>
      </div>
    </div>
  );
};

export default AddCredentialSection;
