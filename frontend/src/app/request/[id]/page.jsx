import RequestUserView from "@/app/components/RequestUserView";


export default async function RequestPage({ params }) {
  const { id } = await params;
  return <RequestUserView id={id} />;
}