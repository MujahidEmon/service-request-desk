import Link from "next/link";
import PageHeader from "../components/PageHeader";
import ProviderShell from "../components/ProviderShell";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";

export default function ProviderDashboardPage() {
  return (
    <ProviderShell>
      <TopBar role="Support Person" />

      <div className="mx-auto  px-4 py-6 sm:px-7">
        <PageHeader
          title="Welcome back, Support Team"
          description="Here's what's happening with requests today."
        />

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Requests" value="128" card='odd' />
          <StatCard label="Open" value="32" card='even' />
          <StatCard label="In Progress" value="28" card='odd' />
          <StatCard label="Waiting for User" value="14"card='even' />
        </div>

        
      </div>
    </ProviderShell>
  );
}