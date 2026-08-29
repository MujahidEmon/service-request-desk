export default function RequestTableSkeleton({ rows }) {
  const headers = [
    "",
    "Title",
    "Requester",
    "Category",
    "Priority",
    "Status",
    "Assigned To",
    "Updated",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-225 border-collapse">
        <thead>
          <tr className="border-b border-primary/20 text-left">
            {headers.map((head, index) => (
              <th
                key={head || index}
                className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-primary"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr
              key={index}
              className="border-b border-slate-50"
            >
              {/* Bullet */}
              <td className="px-4 py-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-slate-200" />
              </td>

              {/* Title */}
              <td className="px-4 py-3">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
              </td>

              {/* Requester */}
              <td className="px-4 py-3">
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
              </td>

              {/* Category */}
              <td className="px-4 py-3">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              </td>

              {/* Priority */}
              <td className="px-4 py-3">
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
              </td>

              {/* Assigned To */}
              <td className="px-4 py-3">
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
              </td>

              {/* Updated */}
              <td className="px-4 py-3">
                <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}