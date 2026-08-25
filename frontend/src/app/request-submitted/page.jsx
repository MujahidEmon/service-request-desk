import { Suspense } from "react";
import SubmissionSuccess from "../components/SubmissionSuccess";
import TopBar from "../components/TopBar";

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