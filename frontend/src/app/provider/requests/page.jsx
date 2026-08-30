import PageHeader from "@/app/components/PageHeader";
import ProviderShell from "@/app/components/ProviderShell";
import RequestFilters from "@/app/components/RequestFilter/RequestFilters";
import TopBar from "@/app/components/TopBar";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";


export default function ProviderRequestsPage() {
  return (
    <ProviderShell>
      <TopBar role="Support Person" />

      <div className="mx-auto  px-4 py-6 sm:px-7">
        <Link
          href="/provider"
          className="inline-flex mb-6 items-center gap-1.5 text-sm font-semibold text-primary"
        >
          <HiOutlineArrowLeft size={15} />
          Back to Dashboard
        </Link>
        <PageHeader
          title="All Requests"
          description="Search, filter and manage submitted service requests."
        />

        <section className="srd-card srd-shadow overflow-hidden">
          <RequestFilters></RequestFilters>
        </section>
      </div>
    </ProviderShell>
  );
}