import ProviderRequestDetails from "@/app/components/provider/ProviderRequestDetails/ProviderRequestDetails";


export default async function ProviderRequestPage({ params }) {
  const { id } = await params;
  return <ProviderRequestDetails id={id} />;
}