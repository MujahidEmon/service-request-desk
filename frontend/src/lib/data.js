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
    Open: "status-open",
    "In Progress": "status-progress",
    "Waiting for User": "status-waiting",
    Resolved: "status-resolved",
    Closed: "status-closed",
  };
  return map[status] ?? "status-closed";
}

export function getPriorityClass(priority) {
  const map = {
    Low: "priority-low",
    Medium: "priority-medium",
    High: "priority-high",
    Urgent: "priority-urgent",
  };
  return map[priority] ?? "priority-medium";
}