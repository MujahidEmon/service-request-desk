import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://your-domain.com"),

  title: {
    default: "Service Request Desk | Submit, Track & Manage Requests",
    template: "%s | Service Request Desk",
  },

  description:
    "Service Request Desk is a modern service request management platform for submitting, tracking, assigning, and resolving service requests efficiently.",

  keywords: [
    "Service Request Desk",
    "service request management",
    "service desk",
    "request management system",
    "IT service desk",
    "support ticket system",
    "service request tracking",
    "support request management",
    "ticket management system",
    "request tracking",
  ],

  authors: [
    {
      name: "Service Request Desk",
    },
  ],

  creator: "Service Request Desk",
  publisher: "Service Request Desk",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Service Request Desk",
    title: "Service Request Desk | Submit, Track & Manage Requests",
    description:
      "Submit, track, and manage service requests with Service Request Desk. Requesters can create and track requests while support agents manage, assign, and resolve them efficiently.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Service Request Desk",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Service Request Desk | Submit, Track & Manage Requests",
    description:
      "A modern service request management platform for submitting, tracking, assigning, and resolving service requests.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: "https://your-domain.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${quickSand.className} h-full bg-custom-1 antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
