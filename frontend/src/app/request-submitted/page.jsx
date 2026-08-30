import { Suspense } from "react";
import SubmissionSuccess from "../components/SubmissionSuccess";
import TopBar from "../components/TopBar";
export const metadata = {
  title: "Request Submitted Successfully",
  description:
    "Your service request has been submitted successfully. Save your request number to track its status and view future updates.",
};

function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-white">
      <span className="loading loading-spinner text-primary" />
    </main>
  );
}

export default function RequestSubmittedPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TopBar></TopBar>
      <SubmissionSuccess />
    </Suspense>
  );
}