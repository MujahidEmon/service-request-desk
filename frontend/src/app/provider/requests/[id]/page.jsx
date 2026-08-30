import ProviderRequestDetails from "@/app/components/provider/ProviderRequestDetails/ProviderRequestDetails";
export const metadata = {
    title: "Request Details",
     description: 'View details, status, updates, and information for service request.'
};

export default async function ProviderRequestPage({ params }) {
  const { id } = await params;
  return <ProviderRequestDetails id={id} />;
}