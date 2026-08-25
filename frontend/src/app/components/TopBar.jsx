import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineUserCircle } from "react-icons/hi2";

export default function TopBar({ role = "Requester" }) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-7">
      <Link
          href="/"
          className=" inline-flex items-center bg-primary/5 btn gap-1.5 text-sm font-semibold "
        >
          <HiOutlineArrowLeft size={15} />
          Back to Home
        </Link>
      <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700">
        <HiOutlineUserCircle size={23} className="text-slate-400" />
        {role}
      </button>
    </div>
  );
}