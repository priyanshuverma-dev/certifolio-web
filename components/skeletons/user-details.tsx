import React from "react";
import { Skeleton } from "../ui/skeleton";

const UserProfileLoading = () => {
  return (
    <div className="flex items-start justify-start py-2">
      <Skeleton className="w-28 h-28 rounded-full mr-3 shadow" />
      <div className="py-2">
        <Skeleton className="w-40 h-6 mb-2" />
        <Skeleton className="w-20 h-4" />
      </div>
    </div>
  );
};

export default UserProfileLoading;
