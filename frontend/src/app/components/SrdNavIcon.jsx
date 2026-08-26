import Link from "next/link";
import { HiOutlineShieldCheck } from "react-icons/hi2";

export default function SrdNavIcon() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="p-1 shrink-0 place-items-center rounded-lg bg-white/40">
        <HiOutlineShieldCheck size={22} />
      </div>
      <div className="flex flex-col items-start">
        <div className="block text-md font-extrabold leading-none">
          SRD
        </div>
        <div className="mt-0.5 block text-xs font-medium leading-none">
          Service Request Desk
        </div>
      </div>
    </Link>
  );
}