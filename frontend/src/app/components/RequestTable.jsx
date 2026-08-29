'use client'
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { PriorityBadge, StatusBadge } from "./StatusBadge";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "@/services/requestApi";

export default function RequestTable() {
  const { isLoading, data: requests = [], isError, error } = useQuery({
    queryKey: ['requests'],
    queryFn: getRequests,
  })

  console.log(requests);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-225 border-collapse">
        <thead>
          <tr className="border-b border-primary/20 text-left">
            {["", "Title", "Requester", "Category", "Priority", "Status", "Assigned To", "Updated"].map(
              (head, index) => (
                <th
                  key={head || index}
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-primary"
                >
                  {head}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr
              key={request._id}
              className="border-b border-slate-50 transition hover:bg-slate-50/80"
            >
              <td className="px-4 py-3 text-[10px] text-slate-800">•</td>
              <td className="px-4 py-3">
                <Link
                  href={`/provider/requests/${request._id}`}
                  className="text-sm font-semibold text-slate-800 hover:text-[#3156d8]"
                >
                  {request.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-base-content">
                {request.requesterName}
              </td>
              <td className="px-4 py-3 text-sm text-base-content">
                {request.category}
              </td>
              <td className="px-4 py-3">
                <PriorityBadge priority={request.priority} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={request.status} />
              </td>
              <td className="px-4 py-3 text-sm text-base-content">
                 {request.assignedPerson?.name ?? "—"}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                {request.updatedAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {requests.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
          <span>Showing 1 to {requests.length} of 128 results</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 26].map((page) => (
              <button
                key={page}
                className={`grid size-7 place-items-center rounded-md border text-sm font-semibold ${page === 1
                  ? "border-blue-200 bg-blue-50 text-[#3156d8]"
                  : "border-transparent text-slate-500 hover:bg-slate-50"
                  }`}
              >
                {page}
              </button>
            ))}
            <HiOutlineArrowRight size={13} />
          </div>
        </div>
      )}
    </div>
  );
}