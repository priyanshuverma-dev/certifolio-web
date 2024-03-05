"use client";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");

  async function onLogin() {
    try {
      setIsLoading(true);
      const res = await signIn("google", {
        redirect: false,
      });
      if (res?.error) throw new Error(res.error);
      if (res?.ok) {
        toast({
          title: `Success: Authenticated`,
          description: "Continue to home",
        });
        if (callback) {
          router.push(callback);
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: `Error: Authentication Failed`,
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center ">
      <div className="p-2">
        <Button
          variant="outline"
          type="button"
          onClick={onLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle className="mr-2 h-4 w-4" />
          )}
          Continue with Google
        </Button>
      </div>
      <div className="w-32">
        <div className="relative ">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Stay Alert !
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
