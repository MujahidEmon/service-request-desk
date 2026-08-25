export const categories = [
  "Hardware",
  "Software",
  "Access",
  "Network",
  "Other",
];

export const priorities = ["Low", "Medium", "High", "Urgent"];

export const statuses = [
  "Open",
  "In Progress",
  "Waiting for User",
  "Resolved",
  "Closed",
];

export const supportPeople = [
  { id: "hasan", name: "Hasan Mahmud" },
  { id: "nusrat", name: "Nusrat Jahan" },
  { id: "raihan", name: "Raihan Ahmed" },
  { id: "sadia", name: "Sadia Khan" },
];

export const requests = [
  {
    id: "REQ-2024-0001",
    title: "Unable to connect to Wi-Fi",
    description:
      "I am unable to connect to the office Wi-Fi from my laptop since this morning. Other devices are working fine.",
    requesterName: "Emon Ahmed",
    category: "Network",
    priority: "High",
    status: "Open",
    assignedPerson: null,
    createdAt: "May 20, 2024 · 10:30 AM",
    updatedAt: "10 min ago",
    notes: [],
  },
  {
    id: "REQ-2024-0002",
    title: "Excel not opening",
    description:
      "Microsoft Excel crashes immediately after opening a workbook.",
    requesterName: "Sadia Khan",
    category: "Software",
    priority: "Medium",
    status: "In Progress",
    assignedPerson: "Hasan Mahmud",
    createdAt: "May 20, 2024 · 09:45 AM",
    updatedAt: "25 min ago",
    notes: [],
  },
  {
    id: "REQ-2024-0003",
    title: "Request for VPN access",
    description:
      "I need VPN access to connect to the internal resources from home.",
    requesterName: "Rafiq Islam",
    category: "Access",
    priority: "High",
    status: "Waiting for User",
    assignedPerson: "Nusrat Jahan",
    createdAt: "May 20, 2024 · 09:15 AM",
    updatedAt: "1 hour ago",
    notes: [],
  },
  {
    id: "REQ-2024-0004",
    title: "Mouse not working",
    description:
      "The mouse is no longer responding on my workstation.",
    requesterName: "Jahid Hasan",
    category: "Hardware",
    priority: "Low",
    status: "Resolved",
    assignedPerson: "Hasan Mahmud",
    createdAt: "May 20, 2024 · 08:30 AM",
    updatedAt: "2 hours ago",
    notes: [],
  },
  {
    id: "REQ-2024-0005",
    title: "Printer installation",
    description:
      "Please install and configure the new printer on my workstation.",
    requesterName: "Tanzila Mim",
    category: "Hardware",
    priority: "Medium",
    status: "Closed",
    assignedPerson: "Nusrat Jahan",
    createdAt: "May 20, 2024 · 08:00 AM",
    updatedAt: "3 hours ago",
    notes: [],
  },
];

export function getRequestById(id) {
  return requests.find((request) => request.id === id) ?? requests[0];
}

export function getStatusClass(status) {
  const map = {
    Open: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    "In Progress": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
    "Waiting for User": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    Resolved: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    Closed: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
  };
  return map[status] ?? "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200";
}

export function getPriorityClass(priority) {
  const map = {
    Low: "bg-emerald-50 text-emerald-700",
    Medium: "bg-amber-50 text-amber-700",
    High: "bg-red-50 text-red-600",
    Urgent: "bg-red-100 text-red-700",
  };
  return map[priority] ?? "bg-amber-50 text-amber-700";
}