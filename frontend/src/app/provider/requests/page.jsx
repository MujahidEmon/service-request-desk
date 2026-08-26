import PageHeader from "@/app/components/PageHeader";
import ProviderShell from "@/app/components/ProviderShell";
import TopBar from "@/app/components/TopBar";


export default function ProviderRequestsPage() {
  return (
    <ProviderShell>
      <TopBar role="Support Person" />

      <div className="mx-auto  px-4 py-6 sm:px-7">
        <PageHeader
          title="All Requests"
          description="Search, filter and manage submitted service requests."
          action={
            <button className="srd-primary-button h-9">
              + Create Note
            </button>
          }
        />

        <section className="srd-card srd-shadow overflow-hidden">
            Filters
        </section>
      </div>
    </ProviderShell>
  );
}