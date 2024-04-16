"use client";

import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const { data, error, isLoading, status, refetch } = useQuery({
    queryKey: ["me"],
    refetchIntervalInBackground: true,
    queryFn: async () => {
      try {
        const response = await fetch(`/api/auth/me`);
        const body = await response.json();
        if (response.ok) {
          return body as User;
        } else {
          throw new Error(body.message);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });

  return {
    data,
    error,
    isLoading,
    status,
    refetch,
  };
};

export default useCurrentUser;
