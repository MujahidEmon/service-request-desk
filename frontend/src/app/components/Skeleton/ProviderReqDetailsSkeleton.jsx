 const RequestDetailsSkeleton = () => {
  return (
    <div className="mx-auto px-4 py-6 sm:px-7">
      {/* Back */}
      <div className="flex items-center gap-1.5">
        <div className="skeleton h-4 w-4 rounded" />
        <div className="skeleton h-4 w-28 rounded" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
        {/* Main Content */}
        <section className="srd-card srd-shadow overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-2">
              <div className="skeleton h-6 w-32 rounded" />
              <div className="skeleton h-6 w-20 rounded-full" />
            </div>

            <div className="skeleton mt-2 h-4 w-48 rounded" />
          </div>

          {/* Details */}
          <div className="grid gap-0 md:grid-cols-2">
            {/* Title */}
            <div className="border-b border-slate-100 p-5 sm:px-7">
              <div className="skeleton mb-2 h-3 w-10 rounded" />
              <div className="skeleton h-5 w-48 rounded" />
            </div>

            {/* Status */}
            <div className="border-b border-slate-100 p-5 sm:px-7">
              <div className="skeleton mb-2 h-3 w-14 rounded" />
              <div className="skeleton h-9 w-32 rounded-lg" />
            </div>

            {/* Description */}
            <div className="border-b border-slate-100 p-5 md:col-span-2 sm:px-7">
              <div className="skeleton mb-2 h-3 w-20 rounded" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-11/12 rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
              </div>
            </div>

            {/* Requester */}
            <div className="border-b border-slate-100 p-5 sm:px-7">
              <div className="skeleton mb-2 h-3 w-16 rounded" />
              <div className="skeleton h-5 w-36 rounded" />
            </div>

            {/* Category */}
            <div className="border-b border-slate-100 p-5 sm:px-7">
              <div className="skeleton mb-2 h-3 w-16 rounded" />
              <div className="skeleton h-5 w-28 rounded" />
            </div>

            {/* Priority */}
            <div className="border-b border-slate-100 p-5 sm:px-7">
              <div className="skeleton mb-2 h-3 w-14 rounded" />
              <div className="skeleton h-9 w-32 rounded-lg" />
            </div>

            {/* Assigned To */}
            <div className="border-b border-slate-100 p-5 sm:px-7">
              <div className="skeleton mb-2 h-3 w-20 rounded" />
              <div className="skeleton h-9 w-36 rounded-lg" />
            </div>

            {/* Last Updated */}
            <div className="border-b border-slate-100 p-5 sm:px-7">
              <div className="skeleton mb-2 h-3 w-24 rounded" />
              <div className="skeleton h-5 w-44 rounded" />
            </div>
          </div>

          {/* Internal Notes */}
          <div className="border-t border-slate-100 p-5 sm:p-7">
            <div className="mb-3 flex items-center justify-between">
              <div className="skeleton h-5 w-32 rounded" />
              <div className="skeleton h-8 w-20 rounded-lg" />
            </div>

            <div className="space-y-3">
              {/* Note 1 */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="skeleton h-4 w-24 rounded" />
                  <div className="skeleton h-3 w-28 rounded" />
                </div>
                <div className="skeleton mt-2 h-3 w-4/5 rounded" />
                <div className="skeleton mt-1 h-3 w-3/5 rounded" />
              </div>

              {/* Note 2 */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="skeleton h-4 w-28 rounded" />
                  <div className="skeleton h-3 w-24 rounded" />
                </div>
                <div className="skeleton mt-2 h-3 w-3/4 rounded" />
                <div className="skeleton mt-1 h-3 w-1/2 rounded" />
              </div>
            </div>
          </div>
        </section>

        {/* Right Action Panel */}
        <aside className="srd-card srd-shadow h-fit p-4">
          <div className="skeleton mb-4 h-5 w-20 rounded" />

          <div className="space-y-2">
            <div className="skeleton h-10 w-full rounded-lg" />
            <div className="skeleton h-10 w-full rounded-lg" />
            <div className="skeleton h-10 w-full rounded-lg" />
            <div className="skeleton h-10 w-full rounded-lg" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>

          <div className="skeleton mt-3 h-12 w-full rounded-lg" />
        </aside>
      </div>
    </div>
  );
};

export default RequestDetailsSkeleton