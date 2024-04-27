"use client";

import { useCurrentUserState } from "@/store/user-state";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const userState = useCurrentUserState();

  // Use this flag to determine whether to fetch data
  const shouldFetch = !userState.user;

  const { data, error, isLoading, status, refetch } = useQuery({
    queryKey: ["me"],
    enabled: shouldFetch,
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

  if (data && !userState.user) {
    userState.setUser(data);
  }

  return {
    data: userState.user || data,
    error,
    isLoading: isLoading && shouldFetch,
    status,
    refetch,
  };
};

export default useCurrentUser;
