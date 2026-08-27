import React from 'react';

const ActionButton = ({ icon: Icon, label, onClick, disabled, danger, green }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`flex h-9 w-full items-center gap-2 rounded-lg border px-3 text-left text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${danger
                    ? "border-red-100 text-red-600 hover:bg-red-50"
                    : green
                        ? "border-emerald-100 text-emerald-700 hover:bg-emerald-50"
                        : "border-blue-100 text-[#3156d8] hover:bg-blue-50"
                }`}
        >
            <Icon size={14} />
            {label}
        </button>
    );
};

export default ActionButton;