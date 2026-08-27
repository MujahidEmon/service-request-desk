import { HiOutlineXMark } from "react-icons/hi2";
import React from 'react';

const Modal = ({ title, children, onClose, width = "max-w-md" }) => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-[2px]">
      <div className={`w-full ${width} rounded-2xl bg-white shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-extrabold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"
            aria-label="Close modal"
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;