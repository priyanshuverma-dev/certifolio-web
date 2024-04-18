"use client";
import React from "react";
import ProfileSettingsForm from "./profile-form";
import AccountSettingsForm from "./account-form";
import { useSearchParams } from "next/navigation";
import useCurrentUser from "@/hooks/use-current-user";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const FormSection = (props: Props) => {
  const { data, error, isLoading, status } = useCurrentUser();

  const searchParams = useSearchParams();
  const selected = searchParams.get("selected") || "Profile";
  console.log(data);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="m-2 py-3">
      {selected === "Profile" && (
        <ProfileSettingsForm
          userData={{
            data,
            error,
          }}
        />
      )}
      {selected === "Account" && (
        <AccountSettingsForm
          userData={{
            data,
            error,
          }}
        />
      )}
      {selected === "Theme" && <div>Theme</div>}
    </div>
  );
};

export default FormSection;
