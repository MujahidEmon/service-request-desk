export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3156d8]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}