
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
import Modal from "../Modal";
import ModalActions from "./ModalActions";
export default function ProviderRequestDetails({ id }) {
  const base = getRequestById(id);
  const [request, setRequest] = useState(base);
  const [modal, setModal] = useState(null);
  const [note, setNote] = useState("");


  const canClose = request.status === "Resolved";

  const update = (field, value) => {
    setRequest((current) => ({ ...current, [field]: value }));
  };

  const addNote = () => {
    if (!note.trim()) return;
    setRequest((current) => ({
      ...current,
      notes: [
        ...(current.notes || []),
        {
          text: note.trim(),
          author: "Hasan Mahmud",
          time: "Just now",
        },
      ],
    }));
    setNote("");
    setModal(null);
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
                <h2 className="text-md font-extrabold text-slate-900">
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
                        <p className="text-sm font-bold text-slate-700">
                          {item.author}
                        </p>
                        <span className="text-sm text-base-content">{item.time}</span>
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
                onClick={() => setModal("assign")}
                disabled={request.status === "Closed"}
              />
              <ActionButton
                icon={HiOutlineFlag}
                label="Change Priority"
                onClick={() => setModal("priority")}
                disabled={request.status === "Closed"}
              />
              <ActionButton
                icon={HiOutlineAdjustmentsHorizontal}
                label="Change Status"
                onClick={() => setModal("status")}
                disabled={request.status === "Closed"}
              />
              <ActionButton
                icon={HiOutlineCheckCircle}
                label="Resolve"
                green
                onClick={() => update("status", "Resolved")}
                disabled={request.status === "Closed"}
              />
              <ActionButton
                icon={HiOutlineLockClosed}
                label="Close Request"
                danger
                onClick={() => canClose && update("status", "Closed")}
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

      {modal === "assign" && (
        <Modal title="Assign / Reassign" onClose={() => setModal(null)}>
          <label className="srd-label">Select Support Person <span className="text-red-500">*</span></label>
          <select
            className="srd-dropdown-select"
            value={request.assignedPerson || ""}
            onChange={(e) => update("assignedPerson", e.target.value || null)}
          >
            <option value="">Select person</option>
            {supportPeople.map((person) => (
              <option key={person.id}>{person.name}</option>
            ))}
          </select>
          <ModalActions
            onCancel={() => setModal(null)}
            onConfirm={() => setModal(null)}
            label="Assign"
          />
        </Modal>
      )}

      {modal === "note" && (
        <Modal title="Add Internal Note" onClose={() => setModal(null)}>
          <label className="srd-label">Note <span className="text-red-500">*</span></label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
            className="min-h-32 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            placeholder="Write your internal note here..."
          />
          <p className="mt-1 text-[9px] text-slate-400">{note.length}/500</p>
          <ModalActions
            onCancel={() => setModal(null)}
            onConfirm={addNote}
            label="Add Note"
            disabled={!note.trim()}
            icon={HiOutlinePaperAirplane}
          />
        </Modal>
      )}

      {modal === "priority" && (
        <Modal title="Change Priority" onClose={() => setModal(null)}>
          <label className="srd-label">Priority</label>
          <select
            className="srd-dropdown-select"
            value={request.priority}
            onChange={(e) => update("priority", e.target.value)}
          >
            {priorities.map((item) => <option key={item}>{item}</option>)}
          </select>
          <ModalActions onCancel={() => setModal(null)} onConfirm={() => setModal(null)} label="Save" />
        </Modal>
      )}

      {modal === "status" && (
        <Modal title="Change Status" onClose={() => setModal(null)}>
          <label className="srd-label">Status</label>
          <select
            className="srd-dropdown-select"
            value={request.status}
            onChange={(e) => {
              const next = e.target.value;
              if (next !== "Closed" || request.status === "Resolved") {
                update("status", next);
              }
            }}
          >
            {statuses.map((item) => (
              <option
                key={item}
                disabled={item === "Closed" && request.status !== "Resolved"}
              >
                {item}
              </option>
            ))}
          </select>
          <ModalActions onCancel={() => setModal(null)} onConfirm={() => setModal(null)} label="Save" />
        </Modal>
      )}

    </ProviderShell>
  );
}