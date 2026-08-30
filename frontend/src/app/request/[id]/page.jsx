import RequestUserView from "@/app/components/RequestUserView/RequestUserView";
export const metadata = {
  title: "Request Details",
  description:
    "View complete service request details, including requester information, priority, status, assignment, description, and request updates.",
};
export default async function RequestPage({ params }) {
  const { id } = await params;
  return <RequestUserView id={id} />;
}