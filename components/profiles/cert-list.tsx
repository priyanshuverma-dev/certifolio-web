"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import useUsersCertificates from "@/hooks/use-users-certificates";
import CertCard from "../main/cert-card";
import ProfileCertCard from "./cert-card";
import FeedLoading from "../skeletons/feed-list";

type Props = {
  user: User;
};

const ProfileCertList = ({ user }: Props) => {
  const { data, error, isLoading } = useUsersCertificates({
    username: user.username,
  });
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

  return (
    <div className="py-2 h-full space-y-2">
      {data?.map((cert) => (
        <ProfileCertCard key={cert.id} cert={cert} />
      ))}
    </div>
  );
};

export default ProfileCertList;
