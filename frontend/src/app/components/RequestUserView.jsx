import Link from "next/link";
import { StatusBadge, PriorityBadge } from "./StatusBadge";
import {
  HiOutlineArrowLeft,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineFlag,
  HiOutlineClock,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { getRequestById } from "@/lib/data";
import TopBar from "./TopBar";

export default function RequestUserView({ id }) {
  const request = getRequestById(id);

  return (
    <main className="min-h-screen">
      <TopBar></TopBar>
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-7">
        

        <div className="srd-card srd-shadow mt-4 overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-slate-900">
                    Request Details
                  </h1>
                  <StatusBadge status={request.status} />
                </div>
                <p className="mt-1 text-sm text-black/70">
                  {request.id} · {request.createdAt}
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
                {request.title}
              </InfoRow>
              <InfoRow icon={HiOutlineChatBubbleLeftEllipsis} label="Description">
                {request.description}
              </InfoRow>
              <InfoRow icon={HiOutlineUser} label="Requester Name">
                {request.requesterName}
              </InfoRow>
              <InfoRow icon={HiOutlineTag} label="Category">
                <span className="rounded-md bg-slate-100 px-2 py-1  font-semibold text-slate-600">
                  {request.category}
                </span>
              </InfoRow>
              <InfoRow icon={HiOutlineFlag} label="Priority">
                <PriorityBadge priority={request.priority} />
              </InfoRow>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50 lg:border-l lg:border-t-0">
              <InfoRow icon={HiOutlineClock} label="Status">
                <StatusBadge status={request.status} />
              </InfoRow>
              <InfoRow icon={HiOutlineUser} label="Assigned To">
                {request.assignedPerson ?? "Not assigned yet"}
              </InfoRow>
              <InfoRow icon={HiOutlineCalendarDays} label="Last Updated">
                {request.updatedAt}
              </InfoRow>
            </div>
          </div>

         
        </div>
      </div>
    </main>
  );
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4 px-5 py-4 sm:px-7">
      <Icon size={16} className="mt-0.5 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-md font-bold uppercase tracking-wide text-primary/70">
          {label}
        </p>
        <div className="mt-1 text-sm  text-base-content">{children}</div>
      </div>
    </div>
  );
}

function HiOutlineInformationCircleSafe({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10.5V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}