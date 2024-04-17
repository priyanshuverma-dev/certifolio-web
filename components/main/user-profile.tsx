"use client";

import useCurrentUser from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserProfileLoading from "../skeletons/user-details";

const UserProfile = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) return <UserProfileLoading />;

  if (error) {
    return (
      <details className="text-destructive leading-8">
        <summary>Error loading user profile 😢</summary>
        {error.message}
      </details>
    );
  }

  return (
    <div className="flex items-start justify-start py-2">
      <Avatar className="w-28 h-28 rounded-full mr-3 shadow">
        <AvatarImage src={user?.image ?? ""} />
        <AvatarFallback>{user?.name?.at(0)}</AvatarFallback>
      </Avatar>
      <div className="py-2">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {user?.name}
        </h2>
        <p className="text-muted-foreground">@{user?.username}</p>
        <p className="text-sm text-muted-foreground">{user?.bio}</p>
      </div>
    </div>
  );
};

export default UserProfile;
