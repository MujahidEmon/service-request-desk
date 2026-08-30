'use client'
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { PriorityBadge, StatusBadge } from "../StatusBadge";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "@/services/requestApi";
import { useState } from "react";

export default function RequestFilterTable({ pagination, requests }) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
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
                {formatDate(request.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}