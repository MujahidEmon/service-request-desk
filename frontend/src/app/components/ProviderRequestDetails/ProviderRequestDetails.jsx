
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProviderShell from "../ProviderShell";
import {
  HiOutlineArrowLeft,
  HiOutlineUserPlus,
  HiOutlineFlag,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlineTrash,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { getRequestById, statuses, priorities, supportPeople } from "@/lib/data";
import { PriorityBadge, StatusBadge } from "../StatusBadge";
import ReqDetails from "./ReqDetails";
import ActionButton from "./ActionButton";
export default function ProviderRequestDetails({ id }) {
  const base = getRequestById(id);
  const [request, setRequest] = useState(base);
  

  const canClose = request.status === "Resolved";

  const update = (field, value) => {
    setRequest((current) => ({ ...current, [field]: value }));
  };



  return (
    <ProviderShell>
      <div className="mx-auto  px-4 py-6 sm:px-7">
        <Link
          href="/provider/requests"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3156d8]"
        >
          <HiOutlineArrowLeft size={15} />
          Back to Requests
        </Link>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
          <section className="srd-card srd-shadow overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-extrabold text-slate-900">
                      {request.id}
                    </h1>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="mt-1 text-sm text-base-content">
                    Created on {request.createdAt}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              <ReqDetails label="Title">{request.title}</ReqDetails>
              <ReqDetails label="Status">
                <select
                  value={request.status}
                  onChange={(e) => update("status", e.target.value)}
                  className="srd-dropdown-select max-w-47"
                  disabled={request.status === "Closed"}
                >
                  {statuses.map((status) => (
                    <option
                      key={status}
                      disabled={status === "Closed" && request.status !== "Resolved"}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </ReqDetails>

              <ReqDetails label="Description" wide>
                {request.description}
              </ReqDetails>

              <ReqDetails label="Requester">{request.requesterName}</ReqDetails>
              <ReqDetails label="Category">{request.category}</ReqDetails>
              <ReqDetails label="Priority">
                <select
                  value={request.priority}
                  onChange={(e) => update("priority", e.target.value)}
                  className="srd-dropdown-select max-w-47"
                  disabled={request.status === "Closed"}
                >
                  {priorities.map((priority) => (
                    <option key={priority}>{priority}</option>
                  ))}
                </select>
              </ReqDetails>

              <ReqDetails label="Assigned To" wide>
                <select
                  value={request.assignedPerson || ""}
                  onChange={(e) =>
                    update("assignedPerson", e.target.value || null)
                  }
                  className="srd-dropdown-select max-w-47"
                  disabled={request.status === "Closed"}
                >
                  <option value="">Select person</option>
                  {supportPeople.map((person) => (
                    <option key={person.id}>{person.name}</option>
                  ))}
                </select>
              </ReqDetails>

              <ReqDetails label="Last Updated">{request.updatedAt}</ReqDetails>
            </div>

            <div className="border-t border-slate-100 p-5 sm:p-7">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900">
                  Internal Notes
                </h2>
                <button
                  type="button"
                  onClick={() => setModal("note")}
                  className="srd-primary-button h-8"
                >
                  Add Note
                </button>
              </div>

              <div className="space-y-3">
                {request.notes?.length ? (
                  request.notes.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[10px] font-bold text-slate-700">
                          {item.author}
                        </p>
                        <span className="text-[9px] text-base-content">{item.time}</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-xl border border-dashed border-slate-200 p-4 text-xs text-base-content">
                    No internal notes yet.
                  </p>
                )}
              </div>
            </div>
          </section>

          <aside className="srd-card srd-shadow h-fit p-4">
            <h2 className="mb-3 text-md font-extrabold text-slate-900">Actions</h2>

            <div className="space-y-2">
              <ActionButton
                icon={HiOutlineUserPlus}
                label="Assign / Reassign"
                disabled={request.status === "Closed"}
              />
              <ActionButton
                icon={HiOutlineFlag}
                label="Change Priority"
                disabled={request.status === "Closed"}
              />
              <ActionButton
                icon={HiOutlineAdjustmentsHorizontal}
                label="Change Status"
                disabled={request.status === "Closed"}
              />
              <ActionButton
                icon={HiOutlineCheckCircle}
                label="Resolve"
                green
                disabled={request.status === "Closed"}
              />
              <ActionButton
                icon={HiOutlineLockClosed}
                label="Close Request"
                danger
                disabled={!canClose}
              />
            </div>

            {!canClose && request.status !== "Closed" && (
              <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-xs leading-4 text-amber-700">
                A request must be Resolved before it can be Closed.
              </p>
            )}
          </aside>
        </div>
      </div>

     
    </ProviderShell>
  );
}


function ModalActions({ onCancel, onConfirm, label, disabled, icon: Icon }) {
  return (
    <div className="mt-5 flex justify-end gap-2">
      <button type="button" onClick={onCancel} className="srd-secondary-button h-9">
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={disabled}
        className="srd-primary-button h-9"
      >
        {Icon && <Icon size={13} />}
        {label}
      </button>
    </div>
  );
}