"use client";

import CenterContainer from "@/components/center-container";
import MainHeader from "@/components/main/header";
import ProfileCertList from "@/components/profiles/cert-list";
import { ProfileDetails } from "@/components/profiles/details-card";
import FeedLoading from "@/components/skeletons/feed-list";
import UserProfileLoading from "@/components/skeletons/user-details";
import { Separator } from "@/components/ui/separator";
import useUsers from "@/hooks/use-users";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";

const Page = () => {
  const params = useParams();

  const session = useSession();

  const {
    data: user,
    error,
    isLoading,
  } = useUsers({ username: String(params.username) });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return notFound();
  }

  return (
    <CenterContainer>
      <div className="flex flex-col mx-2 h-full">
        <MainHeader
          hideSettings
          showGetHandle={session.status == "unauthenticated"}
        />
        <Separator />
        <ProfileDetails user={user!} />
        <Separator />

        <ProfileCertList user={user!} />
      </div>
    </CenterContainer>
  );
};

export default Page;

const Loading = () => {
  return (
    <CenterContainer>
      <div className="flex flex-col mx-2 h-full">
        <MainHeader hideSettings />
        <Separator />
        <UserProfileLoading />
        <Separator />
        <FeedLoading />
      </div>
    </CenterContainer>
  );
};
