export default function RequestDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-7">
      <div className="srd-card srd-shadow mt-4 overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                {/* Request Details */}
                <div className="skeleton h-7 w-40 rounded-md"></div>

                {/* Status Badge */}
                <div className="skeleton h-6 w-20 rounded-full"></div>
              </div>

              {/* Request Number + Date */}
              <div className="mt-2 flex gap-2">
                <div className="skeleton h-4 w-32 rounded"></div>
                <div className="skeleton h-4 w-36 rounded"></div>
              </div>
            </div>

            {/* Requester Badge */}
            <div className="skeleton h-7 w-24 rounded-full"></div>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-0 lg:grid-cols-[1fr_250px]">
          
          {/* Main Information */}
          <div className="divide-y divide-slate-100">
            
            {/* Title */}
            <SkeletonInfoRow>
              <div className="skeleton h-4 w-20 rounded"></div>
              <div className="skeleton mt-2 h-5 w-3/4 rounded"></div>
            </SkeletonInfoRow>

            {/* Description */}
            <SkeletonInfoRow>
              <div className="skeleton h-4 w-28 rounded"></div>
              <div className="mt-2 space-y-2">
                <div className="skeleton h-4 w-full rounded"></div>
                <div className="skeleton h-4 w-11/12 rounded"></div>
                <div className="skeleton h-4 w-2/3 rounded"></div>
              </div>
            </SkeletonInfoRow>

            {/* Requester Name */}
            <SkeletonInfoRow>
              <div className="skeleton h-4 w-32 rounded"></div>
              <div className="skeleton mt-2 h-5 w-40 rounded"></div>
            </SkeletonInfoRow>

            {/* Category */}
            <SkeletonInfoRow>
              <div className="skeleton h-4 w-20 rounded"></div>
              <div className="skeleton mt-2 h-7 w-24 rounded-md"></div>
            </SkeletonInfoRow>

            {/* Priority */}
            <SkeletonInfoRow>
              <div className="skeleton h-4 w-20 rounded"></div>
              <div className="skeleton mt-2 h-6 w-20 rounded-full"></div>
            </SkeletonInfoRow>
          </div>

          {/* Sidebar */}
          <div className="border-t border-slate-100 bg-slate-50/50 lg:border-l lg:border-t-0">
            
            {/* Status */}
            <SkeletonInfoRow>
              <div className="skeleton h-4 w-16 rounded"></div>
              <div className="skeleton mt-2 h-6 w-20 rounded-full"></div>
            </SkeletonInfoRow>

            {/* Assigned To */}
            <SkeletonInfoRow>
              <div className="skeleton h-4 w-24 rounded"></div>
              <div className="skeleton mt-2 h-5 w-32 rounded"></div>
            </SkeletonInfoRow>

            {/* Last Updated */}
            <SkeletonInfoRow>
              <div className="skeleton h-4 w-28 rounded"></div>
              <div className="skeleton mt-2 h-5 w-36 rounded"></div>
            </SkeletonInfoRow>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonInfoRow({ children }) {
  return (
    <div className="flex gap-4 px-5 py-4 sm:px-7">
      {/* Icon skeleton */}
      <div className="skeleton mt-0.5 h-4 w-4 shrink-0 rounded"></div>

      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}