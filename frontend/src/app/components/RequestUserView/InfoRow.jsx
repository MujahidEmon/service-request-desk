import React from 'react';

const InfoRow = ({ icon: Icon, label, children }) => {
    return (
        <div className="flex gap-4 px-5 py-4 sm:px-7">
            <Icon size={16} className="mt-0.5 shrink-0 text-primary" />
            <div className="min-w-0">
                <p className="text-md font-bold uppercase tracking-wide text-primary/70">
                    {label}
                </p>
                <div className="mt-1 text-sm  text-base-content">{children}</div>
            </div>
        </div>
    );
};

export default InfoRow;