"use client";

import StatCard from "@/app/components/StatCard";
import { getRequests, getRequestByStatus } from "@/services/requestApi";
import { useQueries } from "@tanstack/react-query";

export default function StatusCards() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["requests", "total"],
        queryFn: () => getRequests(1, 1),
      },
      {
        queryKey: ["requests", "status", "Open"],
        queryFn: () => getRequestByStatus("Open"),
      },
      {
        queryKey: ["requests", "status", "In Progress"],
        queryFn: () => getRequestByStatus("In Progress"),
      },
      {
        queryKey: ["requests", "status", "Waiting for User"],
        queryFn: () => getRequestByStatus("Waiting for User"),
      },
      {
        queryKey: ["requests", "status", "Closed"],
        queryFn: () => getRequestByStatus("Closed"),
      },
    ],
  });

  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Total Requests" value="..." card="odd" />
        <StatCard label="Open" value="..." card="even" />
        <StatCard label="In Progress" value="..." card="odd" />
        <StatCard label="Waiting for User" value="..." card="even" />
        <StatCard label="Closed" value="..." card="odd" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load request statistics.
      </div>
    );
  }

  const total = results[0].data?.count ?? 0;
  const open = results[1].data?.count ?? 0;
  const inProgress = results[2].data?.count ?? 0;
  const waitingForUser = results[3].data?.count ?? 0;
  const Closed = results[4].data?.count ?? 0;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <StatCard
        label="Total Requests"
        value={total}
        card="odd"
      />

      <StatCard
        label="Open"
        value={open}
        card="even"
      />

      <StatCard
        label="In Progress"
        value={inProgress}
        card="odd"
      />

      <StatCard
        label="Waiting for User"
        value={waitingForUser}
        card="even"
      />
      <StatCard
        label="Closed"
        value={Closed}
        card="odd"
      />
    </div>
  );
}   