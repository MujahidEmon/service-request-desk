"use client";

import { useMemo, useState } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
} from "react-icons/hi2";
import {
  categories,
  priorities,
  statuses,
  supportPeople,
  requests as allRequests,
} from "@/lib/data";
import RequestTable from "./RequestTable";
import NoResults from "./NoResults";

export default function RequestFilters() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [assigned, setAssigned] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allRequests.filter((request) => {
      const matchesSearch =
        !query ||
        request.title.toLowerCase().includes(query) ||
        request.requesterName.toLowerCase().includes(query) ||
        request.category.toLowerCase().includes(query);

      const matchesStatus = !status || request.status === status;
      const matchesPriority = !priority || request.priority === priority;
      const matchesCategory = !category || request.category === category;
      const matchesAssigned =
        !assigned || request.assignedPerson === assigned;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory &&
        matchesAssigned
      );
    });
  }, [search, status, priority, category, assigned]);

  const clear = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    setCategory("");
    setAssigned("");
  };

  const hasFilters = search || status || priority || category || assigned;

  return (
    <>
      <div className="border-b border-slate-100 p-4">
        <div className="grid gap-2 md:grid-cols-[minmax(220px,1.7fr)_repeat(4,minmax(120px,1fr))_auto]">
          <div className="flex gap-2 flex-row items-center">

            <label className="">
              <HiOutlineMagnifyingGlass
                size={20}
                className=" text-primary"
              />
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, requester..."
              className="srd-input-field "
            />
          </div>

          <FilterSelect value={status} onChange={setStatus} options={statuses} placeholder="Status" />
          <FilterSelect value={priority} onChange={setPriority} options={priorities} placeholder="Priority" />
          <FilterSelect value={category} onChange={setCategory} options={categories} placeholder="Category" />
          <FilterSelect
            value={assigned}
            onChange={setAssigned}
            options={supportPeople.map((person) => person.name)}
            placeholder="Assigned To"
          />

          <button onClick={clear} className="srd-secondary-button h-11">
            <HiOutlineXMark size={14} />
            Clear
          </button>
        </div>
      </div>

      {filtered.length ? (
        <RequestTable requests={filtered} />
      ) : (
        <NoResults onClear={clear} />
      )}

      {hasFilters && filtered.length > 0 && (
        <div className="border-t border-slate-100 px-4 py-2 text-[10px] text-slate-400">
          {filtered.length} matching request{filtered.length === 1 ? "" : "s"}
        </div>
      )}
    </>
  );
}

function FilterSelect({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="srd-dropdown-select"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}