"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supportPeople } from "@/lib/data";
import { updateRequest } from "@/services/requestApi";
import Modal from "../../Modal";
import ModalActions from "../ProviderRequestDetails/ModalActions";

export default function AssignModal({request,id,onClose}) {
  const queryClient = useQueryClient();

  const [selectedPerson, setSelectedPerson] = useState(request?.assignedPerson?.id ||request?.assignedPerson ||"");

  const mutation = useMutation({
    mutationFn: updateRequest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["request", id],
      });
      toast.success(
        response?.message || "Request assigned successfully."
      );
      onClose();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to assign request."
      );
    },
  });

  const handleSubmit = () => {
    if (!selectedPerson) {
      toast.error("Please select a support person.");
      return;
    }

    mutation.mutate({
      id,
      data: {
        supportPersonId: selectedPerson,
      },
    });
  };

  return (
    <Modal
      title="Assign / Reassign"
      onClose={() => {
        if (!mutation.isPending) {
          onClose();
        }
      }}
    >
      <label className="srd-label">
        Select Support Person{" "}
        <span className="text-red-500">*</span>
      </label>

      <select
        className="srd-dropdown-select"
        value={selectedPerson}
        onChange={(e) =>
          setSelectedPerson(e.target.value)
        }
        disabled={mutation.isPending}
      >
        <option value="">Select person</option>

        {supportPeople.map((person) => (
          <option
            key={person.id}
            value={person.id}
          >
            {person?.name}
          </option>
        ))}
      </select>

      <ModalActions
        onCancel={onClose}
        onConfirm={handleSubmit}
        label={
          mutation.isPending ? "Assigning...": "Assign"
        }
        disabled={!selectedPerson || mutation.isPending}
      />
    </Modal>
  );
}