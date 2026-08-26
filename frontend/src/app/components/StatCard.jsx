import Link from "next/link";

export default function StatCard({ label, value, card }) {
  const cards = {
    odd: "border-base-200 bg-base-200/90",
    even: "border-base-300 bg-base-300/90",
  };

  return (
    <div className={`rounded-xl border p-4 ${cards[card]}`}>
      <p className="text-[9px] font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-slate-900">{value}</p>
      <Link
        href="/provider/requests"
        className="mt-2 inline-block text-xs font-bold text-[#3156d8] hover:text-black"
      >
        View all
      </Link>
    </div>
  );
}