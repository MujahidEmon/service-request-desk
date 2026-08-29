import Link from "next/link";
import PageHeader from "../components/PageHeader";
import ProviderShell from "../components/ProviderShell";
import TopBar from "../components/TopBar";
import RequestTable from "../components/RequestTable/RequestTable";
import StatusCards from "./requests/StatusCards";

export default async function ProviderDashboardPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/requests?page=1&limit=5`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  const requests = result?.data ?? [];

  return (
    <ProviderShell>
      <TopBar role="Support Person" />

      <div className="mx-auto px-4 py-6 sm:px-7">
        <PageHeader
          title="Welcome back, Support Team"
          description="Here's what's happening with requests today."
        />

        <StatusCards />

        <section className="srd-card srd-shadow mt-5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-md font-extrabold text-slate-900">
                Recent Requests
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Latest activity from the support queue
              </p>
            </div>

            <Link
              href="/provider/requests"
              className="srd-primary-button h-8"
            >
              View All Requests
            </Link>
          </div>

          <RequestTable requests={requests} />
        </section>
      </div>
    </ProviderShell>
  );
}