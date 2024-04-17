"use client";

import useFeeds from "@/hooks/use-feed";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import CertCard from "./main/cert-card";

const FeedSection = () => {
  const { data, error, status } = useFeeds();
  if (error) {
    return (
      <div className="flex items-center justify-center">
        ERROR: {error.message}
      </div>
    );
  }

  if (status == "pending") {
    return <FeedLoading />;
  }

  return (
    <div className="py-2 h-full space-y-2">
      {data?.map((cert) => (
        <CertCard cert={cert} key={cert.id} />
      ))}
    </div>
  );
};

export default FeedSection;

const FeedLoading = () => {
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
};
