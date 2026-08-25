import Link from "next/link";
import { HiOutlineShieldCheck } from "react-icons/hi2";

export default function Brand({ compact = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#3156d8]/10 text-[#3156d8]">
        <HiOutlineShieldCheck size={21} />
      </span>
      <span className={compact ? "hidden" : "block"}>
        <span className="block text-[13px] font-extrabold leading-none tracking-tight text-slate-900">
          SRD
        </span>
        <span className="mt-0.5 block text-[8px] font-medium leading-none text-slate-500">
          Service Request Desk
        </span>
      </span>
    </Link>
  );
}