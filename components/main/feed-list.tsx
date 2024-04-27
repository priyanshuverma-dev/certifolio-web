"use client";

import useFeeds from "@/hooks/use-feed";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import CertCard from "./cert-card";
import FeedLoading from "../skeletons/feed-list";

const FeedSection = () => {
  const { data, error, isLoading } = useFeeds();
  if (error) {
    return (
      <div className="flex items-center justify-center">
        ERROR: {error.message}
      </div>
    );
  }

  if (isLoading) return <FeedLoading />;

  if (data?.length == 0) {
    return (
      <div className="flex items-center justify-center p-2">
        <p className="text-muted-foreground">No certificates found.</p>
      </div>
    );
  }

  const pinnedPosts = data?.filter((cert) => cert.pinned) ?? [];
  const otherPosts = data?.filter((cert) => !cert.pinned) ?? [];

  const certList = [...pinnedPosts, ...otherPosts];

  return (
    <div className="py-2 h-full space-y-2">
      {certList.map((cert) => (
        <>
          <CertCard cert={cert} key={cert.id} />
        </>
      ))}
    </div>
  );
};

export default FeedSection;
