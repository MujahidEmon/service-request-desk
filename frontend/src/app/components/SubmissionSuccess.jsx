"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineCheck,
  HiOutlineClipboardDocument,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import toast from "react-hot-toast";

export default function   SubmissionSuccess() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "REQ-2026-0001";
  const link = `http://localhost:3000/request/${id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center text-center">
        <div className="relative grid size-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-30" />
          <HiOutlineCheck size={40} strokeWidth={2.5} />
        </div>

        <h1 className="mt-7 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
          Request Submitted Successfully!
        </h1>
        <p className="mt-2 text-slate-500">
          Your request has been created and is now <strong>Open</strong>.
          <br />
          Use the link below to view and track your request.
        </p>

        <div className="mt-7 w-full max-w-xl rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-left">
          <p className="mb-2  font-bold text-emerald-700">
            Your Request Link
          </p>

          <div className="flex flex-col gap-2 rounded-lg border border-emerald-100 bg-white p-1.5 sm:flex-row sm:items-center">
            <input
              readOnly
              value={link}
              className="min-w-0 flex-1 bg-transparent px-2    text-[#3156d8] outline-none"
            />
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-50 px-3 text-md font-bold text-[#3156d8] hover:bg-blue-100"
            >
              <HiOutlineClipboardDocument size={14} />
              Copy Link
            </button>
          </div>
        </div>

        <Link href={`/request/${id}`} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#3156d8] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2749c0] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 mt-5">
          View Request
          <HiOutlineArrowRight size={14} />
        </Link>

        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm text-blue-700">
          Please save this link to check your request status anytime.
        </div>
      </div>
    </main>
  );
}