"use client";

import { useQuery } from "@tanstack/react-query";

const useUsersCertificates = ({ username }: { username: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["certificates", username],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/users/${username}/certificates`);
        const body = await response.json();
        if (response.status == 200) {
          return body as Certificate[];
        }
        if (response.status == 404) {
          return [] as Certificate[];
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
  };
};

export default useUsersCertificates;
