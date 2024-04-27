"use client";

import { useQuery } from "@tanstack/react-query";

const useUsers = ({ username }: { username: string }) => {
  const { data, error, isLoading, status, refetch } = useQuery({
    queryKey: ["users", username],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
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

export default useUsers;
