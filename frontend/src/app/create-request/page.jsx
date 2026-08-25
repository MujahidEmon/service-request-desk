import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import TopBar from "../components/TopBar";
import CreateRequestForm from "../components/CreateRequestForm";

export default function CreateRequestPage() {
  return (
    <main className="min-h-screen ">
      <TopBar role="Requester" />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-7">
        

        <div className="rounded-2xl bg-white border border-base-200 overflow-hidden">
          <div className="border-b text-center border-slate-100 px-5 py-5 sm:px-7">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              Create New Request
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Please fill in the details below to submit a new request
            </p>
          </div>

          <div className="px-5 py-6 sm:px-7">
            <CreateRequestForm />
          </div>
        </div>
      </div>
    </main>
  );
}