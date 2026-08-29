"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import ProviderShell from "../../ProviderShell";

import { HiOutlineArrowLeft, HiOutlineUserPlus, HiOutlineFlag, HiOutlineAdjustmentsHorizontal, HiOutlineCheckCircle, HiOutlineLockClosed, HiOutlinePaperAirplane } from "react-icons/hi2";

import { statuses, priorities, supportPeople } from "@/lib/data";

import { StatusBadge } from "../../StatusBadge";
import ReqDetails from "./ReqDetails";
import ActionButton from "./ActionButton";
import Modal from "../../Modal";
import ModalActions from "./ModalActions";

import { getRequestById, updateRequest, addNote } from "@/services/requestApi"
import { HashLoader } from "react-spinners";


export default function ProviderRequestDetails({ id }) {

  const queryClient = useQueryClient();

  const [request, setRequest] = useState(null);
  const [modal, setModal] = useState(null);
  const [note, setNote] = useState("");


  //temp value for modal
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");


  // Get   single request by id
  const { data, isLoading, isError, error, } = useQuery({
    queryKey: ["request", id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setRequest(data);
    }
  }, [data]);


  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const canClose = request?.status === "Resolved";



  const updateMutation = useMutation({
    mutationFn: updateRequest,
    onSuccess: (response) => {
      const updatedRequest =
        response?.data?.updatedRequest;
      if (updatedRequest) {
        setRequest(updatedRequest);
      }
      queryClient.invalidateQueries({
        queryKey: ["request", id],
      });
      setModal(null);
      toast.success(
        response?.message || "Updated successfully"
      );
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update request");
    },
  });


  const noteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["request", id],
      });
      setNote("");
      setModal(null);
      toast.success(response?.message || "Internal note added");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add note");
    },
  });


  //resubale update function
  const update = (field, value) => {
    if (!id) return;
    updateMutation.mutate({
      id,
      data: {
        [field]: value,
      },
    });
  };


  const openAssignModal = () => {
    setSelectedPerson(
      request?.assignedPerson?.id ||
      request?.assignedPerson ||
      ""
    );
    setModal("assign");
  };



  const openPriorityModal = () => {
    setSelectedPriority(request?.priority || "");
    setModal("priority");
  };

  const openStatusModal = () => {
    setSelectedStatus(request?.status || "");
    setModal("status");
  };

  const handleAssign = () => {
    update("assignedPerson", selectedPerson || null);
  };

  const handlePriority = () => {
    if (!selectedPriority) return;
    update("priority", selectedPriority);
  };


  const handleStatus = () => {
    if (!selectedStatus) return;
    if (
      selectedStatus === "Closed" &&
      request?.status !== "Resolved"
    ) {
      toast.error("Request must be resolved before it can be closed.");
      return;
    }
    update(
      "status",
      selectedStatus
    );
  };


  const handleAddNote = () => {
    const cleanNote = note.trim();
    if (!cleanNote) return;
    noteMutation.mutate({
      id,
      note: cleanNote,
    });
  };


  if (isLoading) {
    return (
      <ProviderShell>
        <div className="flex min-h-[400px] items-center justify-center">
          <HashLoader color="primary" size={25}></HashLoader>
        </div>
      </ProviderShell>
    );
  }
  if (isError) {
    return (
      <ProviderShell>
        <div className="px-4 py-6 sm:px-7">
          <p className="text-sm text-red-500">
            {error?.response?.data?.message ||
              "Failed to load request?."}
          </p>
        </div>
      </ProviderShell>
    );
  }

  if (!request) {
    return (
      <ProviderShell>
        <div className="px-4 py-6 sm:px-7">
          <p className="text-sm text-slate-500">
            Request not found.
          </p>
        </div>
      </ProviderShell>
    );
  }

  return (
    <ProviderShell>

      <div className="mx-auto px-4 py-6 sm:px-7">
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
                      {request?.requestNumber || request?.id}
                    </h1>
                    <StatusBadge
                      status={request?.status}
                    />
                  </div>
                  <p className="mt-1 text-sm text-base-content">
                    Created on{" "}
                    {formatDate(request?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              <ReqDetails label="Title">
                {request?.title}
              </ReqDetails>
              <ReqDetails label="Status">
                <select
                  value={request?.status}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setModal("status");
                  }}
                  className="srd-dropdown-select max-w-47"
                  disabled={
                    request?.status === "Closed" ||
                    updateMutation.isPending
                  }
                >
                  {statuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                      disabled={
                        status === "Closed" &&
                        request?.status !== "Resolved"
                      }
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </ReqDetails>

              <ReqDetails
                label="Description"
                wide
              >
                {request?.description}
              </ReqDetails>
              <ReqDetails label="Requester">
                {request?.requesterName}
              </ReqDetails>
              <ReqDetails label="Category">
                {request?.category}
              </ReqDetails>
              <ReqDetails label="Priority">
                <select
                  value={request?.priority}
                  onChange={(e) => {
                    setSelectedPriority(e.target.value);
                    setModal("priority");
                  }}
                  className="srd-dropdown-select max-w-47"
                  disabled={
                    request?.status === "Closed" ||
                    updateMutation.isPending
                  }
                >
                  {priorities.map((priority) => (
                    <option
                      key={priority}
                      value={priority}
                    >
                      {priority}
                    </option>
                  ))}
                </select>
              </ReqDetails>
              <ReqDetails label="Assigned To" wide>
                <select
                  value={
                    request?.assignedPerson?.id ||
                    request?.assignedPerson ||
                    ""
                  }
                  onChange={(e) => {
                    setSelectedPerson(e.target.value);
                    setModal("assign");
                  }}
                  className="srd-dropdown-select max-w-47"
                  disabled={
                    request?.status === "Closed" ||
                    updateMutation.isPending
                  }
                >
                  <option value="">
                    Select person
                  </option>
                  {supportPeople.map((person) => (
                    <option
                      key={person.id}
                      value={person.id}
                    >
                      {person.name}
                    </option>
                  ))}
                </select>
              </ReqDetails>
              <ReqDetails label="Last Updated">
                {formatDate(request?.updatedAt)}
              </ReqDetails>
            </div>


            {/* Internal Notes */}
            <div className="border-t border-slate-100 p-5 sm:p-7">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-md font-extrabold text-slate-900">
                  Internal Notes
                </h2>
                <button
                  type="button"
                  onClick={() => setModal("note")}
                  disabled={
                    request?.status === "Closed"
                  }
                  className="srd-primary-button h-8"
                >
                  Add Note
                </button>
              </div>
              <div className="space-y-3">
                {request?.internalNotes?.length ? (
                  request?.internalNotes.map(
                    (item, index) => (
                      <div
                        key={item._id || index}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-bold text-slate-700">
                            {item.author || "Support"}
                          </p>
                          <span className="text-sm text-base-content">
                            {item.time ||
                              formatDate(item.createdAt)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {item.text || item.note}
                        </p>
                      </div>
                    )
                  )

                ) : (
                  <p className="rounded-xl border border-dashed border-slate-200 p-4 text-xs text-base-content">
                    No internal notes yet.
                  </p>
                )}
              </div>
            </div>
          </section>


          {/* right side panel */}

          <aside className="srd-card srd-shadow h-fit p-4">
            <h2 className="mb-3 text-md font-extrabold text-slate-900">
              Actions
            </h2>
            <div className="space-y-2">
              <ActionButton
                icon={HiOutlineUserPlus}
                label="Assign / Reassign"
                onClick={openAssignModal}
                disabled={
                  request?.status === "Closed"
                }
              />
              <ActionButton
                icon={HiOutlineFlag}
                label="Change Priority"
                onClick={openPriorityModal}
                disabled={
                  request?.status === "Closed"
                }
              />
              <ActionButton
                icon={HiOutlineAdjustmentsHorizontal}
                label="Change Status"
                onClick={openStatusModal}
                disabled={
                  request?.status === "Closed"
                }
              />
              <ActionButton
                icon={HiOutlineCheckCircle}
                label={
                  updateMutation.isPending
                    ? "Updating..."
                    : "Resolve"
                }
                green
                onClick={() =>
                  update("status", "Resolved")
                }
                disabled={
                  request?.status === "Closed" ||
                  request?.status === "Resolved" ||
                  updateMutation.isPending
                }
              />
              <ActionButton
                icon={HiOutlineLockClosed}
                label={
                  updateMutation.isPending
                    ? "Updating..."
                    : "Close Request"
                }
                danger
                onClick={() =>
                  canClose &&
                  update("status", "Closed")
                }
                disabled={
                  !canClose ||
                  updateMutation.isPending
                }
              />
            </div>
            {!canClose &&
              request?.status !== "Closed" && (

                <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-xs leading-4 text-amber-700">
                  A request must be Resolved before it can be Closed.
                </p>
              )}
          </aside>
        </div>
      </div>

      {modal === "assign" && (
        <Modal
          title="Assign / Reassign"
          onClose={() => {
            if (!updateMutation.isPending) {
              setModal(null);
            }
          }}
        >
          <label className="srd-label">
            Select Support Person{" "}
            <span className="text-red-500">
              *
            </span>
          </label>
          <select
            className="srd-dropdown-select"
            value={selectedPerson}
            onChange={(e) =>
              setSelectedPerson(e.target.value)
            }
            disabled={updateMutation.isPending}
          >
            <option value="">
              Select person
            </option>
            {supportPeople.map((person) => (
              <option
                key={person.id}
                value={person.id}
              >
                {person.name}
              </option>

            ))}
          </select>
          <ModalActions
            onCancel={() => setModal(null)}
            onConfirm={handleAssign}
            label={
              updateMutation.isPending
                ? "Assigning..."
                : "Assign"
            }
            disabled={
              updateMutation.isPending
            }
          />
        </Modal>
      )}

      {modal === "note" && (
        <Modal
          title="Add Internal Note"
          onClose={() => {
            if (!noteMutation.isPending) {
              setModal(null);
            }
          }}
        >
          <label className="srd-label">
            Note{" "}
            <span className="text-red-500">
              *
            </span>
          </label>
          <textarea
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            maxLength={500}
            disabled={noteMutation.isPending}
            className="min-h-32 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            placeholder="Write your internal note here..."
          />
          <p className="mt-1 text-[9px] text-slate-400">
            {note.length}/500
          </p>
          <ModalActions
            onCancel={() => setModal(null)}
            onConfirm={handleAddNote}
            label={
              noteMutation.isPending
                ? "Adding..."
                : "Add Note"
            }
            disabled={
              !note.trim() ||
              noteMutation.isPending
            }
            icon={HiOutlinePaperAirplane}
          />

        </Modal>

      )}
      {modal === "priority" && (

        <Modal
          title="Change Priority"
          onClose={() => {
            if (!updateMutation.isPending) {
              setModal(null);
            }
          }}
        >
          <label className="srd-label">
            Priority
          </label>
          <select
            className="srd-dropdown-select"
            value={selectedPriority}
            onChange={(e) =>
              setSelectedPriority(e.target.value)
            }
            disabled={updateMutation.isPending}
          >
            {priorities.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}
          </select>
          <ModalActions
            onCancel={() => setModal(null)}
            onConfirm={handlePriority}
            label={
              updateMutation.isPending
                ? "Saving..."
                : "Save"
            }
            disabled={
              updateMutation.isPending ||
              selectedPriority === request?.priority
            }
          />
        </Modal>

      )}
      {modal === "status" && (

        <Modal
          title="Change Status"
          onClose={() => {
            if (!updateMutation.isPending) {
              setModal(null);
            }
          }}
        >
          <label className="srd-label">
            Status
          </label>
          <select
            className="srd-dropdown-select"
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value)
            }
            disabled={updateMutation.isPending}
          >
            {statuses.map((item) => (
              <option
                key={item}
                value={item}
                disabled={
                  item === "Closed" &&
                  request?.status !== "Resolved"
                }
              >
                {item}
              </option>
            ))}
          </select>
          <ModalActions
            onCancel={() => setModal(null)}
            onConfirm={handleStatus}
            label={
              updateMutation.isPending
                ? "Saving..."
                : "Save"
            }
            disabled={
              updateMutation.isPending ||
              selectedStatus === request?.status ||
              (
                selectedStatus === "Closed" &&
                request?.status !== "Resolved"
              )
            }
          />
        </Modal>

      )}

    </ProviderShell>
  );
} 