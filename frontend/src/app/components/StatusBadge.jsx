import { getStatusClass, getPriorityClass } from "@/lib/data";

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex text-xs whitespace-nowrap rounded-md px-2 py-1  font-bold ${getStatusClass(
        status
      )}`}
    >
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex text-xs whitespace-nowrap rounded-md px-2 py-1  font-bold ${getPriorityClass(
        priority
      )}`}
    >
      {priority}
    </span>
  );
}