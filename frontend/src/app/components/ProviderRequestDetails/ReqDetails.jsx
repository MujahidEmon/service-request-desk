import React from 'react';

const ReqDetails = ({ label, children, wide = false }) => {
    return (
        <div className={`${wide ? "md:col-span-2" : ""} border-b border-slate-100 px-5 py-4 sm:px-7`}>
      <p className="text-sm font-bold uppercase tracking-wide text-base-content">{label}</p>
      <div className="mt-1.5 text-sm leading-5 text-slate-700">{children}</div>
    </div>
    );
};

export default ReqDetails;