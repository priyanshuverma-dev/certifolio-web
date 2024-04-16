import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const AddCredentialSection = () => {
  return (
    <div className="flex items-center py-2">
      <Link
        className={cn(buttonVariants({ variant: "blue" }), "w-full")}
        href={"/new"}
      >
        Mint Certificate
      </Link>
    </div>
  );
};

export default AddCredentialSection;
