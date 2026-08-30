'use client'
import Link from "next/link";
import { StatusBadge, PriorityBadge } from "../StatusBadge";
import {
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineFlag,
  HiOutlineClock,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import TopBar from "../TopBar";
import { useQuery } from "@tanstack/react-query";
import { getRequestById } from "@/services/requestApi";
import InfoRow from "./InfoRow";
import RequestDetailsSkeleton from "../Skeleton/RequestDetailsSkeleton";

export default function RequestUserView({ id }) {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['request', id],
    queryFn: () => getRequestById(id),
    enabled: !!id
  })

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
    <main className="min-h-screen">
      <TopBar></TopBar>

      {isLoading ? <RequestDetailsSkeleton></RequestDetailsSkeleton> : <div className="mx-auto max-w-4xl px-4 py-6 sm:px-7">
        <div className="srd-card srd-shadow mt-4 overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-slate-900">
                    Request Details
                  </h1>
                  <StatusBadge status={data?.status} />
                </div>
                <p className="mt-1 text-sm text-black/70">
                  {data?.id} · {formatDate(data?.createdAt)}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                Requester
              </span>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_250px]">
            <div className="divide-y divide-slate-100">
              <InfoRow icon={HiOutlineDocumentText} label="Title">
                {data?.title}
              </InfoRow>
              <InfoRow icon={HiOutlineChatBubbleLeftEllipsis} label="Description">
                {data?.description}
              </InfoRow>
              <InfoRow icon={HiOutlineUser} label="Requester Name">
                {data?.requesterName}
              </InfoRow>
              <InfoRow icon={HiOutlineTag} label="Category">
                <span className="rounded-md bg-slate-100 px-2 py-1  font-semibold text-slate-600">
                  {data?.category}
                </span>
              </InfoRow>
              <InfoRow icon={HiOutlineFlag} label="Priority">
                <PriorityBadge priority={data?.priority} />
              </InfoRow>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50 lg:border-l lg:border-t-0">
              <InfoRow icon={HiOutlineClock} label="Status">
                <StatusBadge status={data?.status} />
              </InfoRow>
              <InfoRow icon={HiOutlineUser} label="Assigned To">
                {data?.assignedPerson ?? "Not assigned yet"}
              </InfoRow>
              <InfoRow icon={HiOutlineCalendarDays} label="Last Updated">
                {formatDate(data?.updatedAt)}
              </InfoRow>
            </div>
          </div>


        </div>
      </div>}
    </main>
  );
}

