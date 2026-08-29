import { useQuery } from "@tanstack/react-query";
import { getRequests } from "./requestApi";


export function useRequests({
  page = 1,
  limit = 10,
  filters = {},
} = {}) {
  return useQuery({
    queryKey: ["requests", page, limit, filters],

    queryFn: () => getRequests(page, limit, filters),

    staleTime: 30 * 1000,

    placeholderData: (previousData) => previousData,
  });
}