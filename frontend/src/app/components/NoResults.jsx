import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function NoResults({ onClear }) {
  return (
    <div className="flex min-h-107 flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 grid size-24 place-items-center rounded-full bg-blue-50 text-[#3156d8]">
        <HiOutlineMagnifyingGlass size={48} strokeWidth={1.4} />
      </div>
      <h2 className="text-lg font-extrabold text-slate-900">No requests found</h2>
      <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
        Try adjusting your search or filter to find what you&apos;re looking for.
      </p>
      <button onClick={onClear} className="srd-secondary mt-5 h-9">
        Clear Filters
      </button>
    </div>
  );
}