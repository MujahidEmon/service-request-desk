import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import QueryProvider from "@/providers/QueryProvider";


const quickSand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title:{
    default: "Service Request Desk",
    template: "%s | Service Request Desk",
  } ,
  description: `Service Request Desk is a web application that allows users to submit and manage service requests. It provides a user-friendly interface for requesters to create new requests, track their status, and communicate with the support team. The application also enables support agents to efficiently handle incoming requests, assign tasks, and provide timely updates to requesters. With its intuitive design and robust features, Service Request Desk streamlines the service request process, ensuring a seamless experience for both requesters and support agents.
  Key Features:
  - Request Submission: Requesters can easily submit service requests by providing relevant details such as title, description, category, and priority.
  - Request Tracking: Requesters can track the status of their submitted requests, view updates, and communicate with support agents.
  - Support Agent Management: Support agents can efficiently manage incoming requests, assign tasks, and provide timely responses to requesters.
  - User-Friendly Interface: The application offers an intuitive and visually appealing interface for both requesters and support agents.
  - Notifications: Users receive notifications for important updates regarding their requests, ensuring they stay informed throughout the process.`,  
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${quickSand.className} h-full bg-custom-1 antialiased`}
    >
      <body className="min-h-full flex flex-col"><QueryProvider>{children}</QueryProvider><Toaster /></body>
    </html>
  );
}
