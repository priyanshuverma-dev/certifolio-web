"use client";

import CenterContainer from "@/components/center-container";
import MainHeader from "@/components/main/header";
import { ProfileDetails } from "@/components/profiles/details-card";
import { Separator } from "@/components/ui/separator";
import useUsers from "@/hooks/use-users";
import { notFound, useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const {
    data: user,
    error,
    isLoading,
  } = useUsers({ username: String(params.username) });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return notFound();
  }

  return (
    <CenterContainer>
      <div className="flex flex-col mx-2 h-full">
        <MainHeader showSettings={false} />
        <Separator />
        <ProfileDetails user={user!} />
        {/* 
        <AddCredentialSection />
        <Separator />
        <FeedSection /> */}
      </div>
    </CenterContainer>
  );
};

export default Page;
