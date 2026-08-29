"use client";

import { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import { categories, priorities, statuses, supportPeople } from "@/lib/data";
import RequestTable from "../RequestTable/RequestTable";
import NoResults from "../NoResults";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "@/services/requestApi";
import RequestFilterTable from "../RequestTable/RequestFilterTable";
import RequestTableSkeleton from "../Skeleton/RequestTableSkeleton";
import FilterSelect from "./FilterSelect";

export default function RequestFilters() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [assigned, setAssigned] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const filters = {
    ...(search && { search }),
    ...(status && { status }),
    ...(priority && { priority }),
    ...(category && { category }),
    ...(assigned && { assignedPerson: assigned }),
  };

  console.log("filters:", filters);
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "requests",
      page,
      filters,
    ],
    queryFn: () => getRequests(page, limit, filters),
    // placeholderData: (previousData) => previousData,
  });

  const requests = data?.data || [];
  const pagination = data?.pagination;

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleAssignedChange = (value) => {
    setAssigned(value);
    setPage(1);
  };

  const clear = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    setCategory("");
    setAssigned("");
    setPage(1);
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
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by title, requester..."
              className="srd-input-field "
            />
          </div>

          <FilterSelect value={status} onChange={handleStatusChange} options={statuses} placeholder="Status" />
          <FilterSelect value={priority} onChange={handlePriorityChange} options={priorities} placeholder="Priority" />
          <FilterSelect value={category} onChange={handleCategoryChange} options={categories} placeholder="Category" />
          <FilterSelect
            value={assigned}
            onChange={handleAssignedChange}
            options={supportPeople}
            valueKey="id"
            labelKey="name"
            placeholder="Assigned To"
          />

          <button onClick={clear} className="srd-secondary-button h-11">
            <HiOutlineXMark size={14} />
            Clear
          </button>
        </div>
      </div>

      {isLoading ? (
        <RequestTableSkeleton rows={9}></RequestTableSkeleton>
      ) : requests.length > 0 ? (
        <RequestFilterTable pagination={pagination} requests={requests} />
      ) : (
        <NoResults onClear={clear} />
      )}


      {/* Result count */}
      {hasFilters && !isLoading && (
        <div className="border-t border-slate-100 px-4 py-2 text-[10px] text-slate-400">
          {data?.count || 0} matching request
          {data?.count === 1 ? "" : "s"}
        </div>
      )}


      {/* Pagination */}
      {/* {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">

          <p className="text-sm text-slate-500">
            Page {pagination.currentPage} of{" "}
            {pagination.totalPages}
          </p>

          <div className="flex gap-2">

            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="srd-secondary-button"
            >
              Previous
            </button>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="srd-secondary-button"
            >
              Next
            </button>

          </div>
        </div>
      )} */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-sm text-slate-500">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, pagination.totalRequests)} of{" "}
            {pagination.totalRequests} results
          </p>

          <div className="flex items-center gap-1">
            {Array.from(
              { length: pagination.totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`grid size-7 place-items-center rounded-md border text-sm font-semibold ${page === pageNumber
                    ? "border-blue-200 bg-blue-50 text-[#3156d8]"
                    : "border-transparent text-slate-500 hover:bg-slate-50"
                  }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
