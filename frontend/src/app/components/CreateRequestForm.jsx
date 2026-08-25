"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { categories,priorities } from "@/lib/data";

export default function CreateRequestForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      requesterName: "",
      category: "",
      priority: "",
    },
  });

  const onSubmit = async (data) => {
    // UI-only for now. Replace this with POST /api/requests later.
    await new Promise((resolve) => setTimeout(resolve, 500));

    const id = "REQ-2026-0001";
    router.push(`/request-submitted?id=${id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block  font-semibold text-slate-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10"
            placeholder="Enter a short title"
            maxLength={100}
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters.",
              },
              maxLength: {
                value: 100,
                message: "Title cannot exceed 100 characters.",
              },
              validate: (value) =>
                value.trim().length >= 5 || "Please enter a meaningful title.",
            })}
          />
          {errors.title && (
            <p className="mt-1.5 text-[10px] font-medium text-primary">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block  font-semibold text-slate-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="min-h-32 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            placeholder="Describe your issue or request in detail..."
            maxLength={1000}
            {...register("description", {
              required: "Description is required.",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters.",
              },
              maxLength: {
                value: 1000,
                message: "Description cannot exceed 1000 characters.",
              },
              validate: (value) =>
                value.trim().length >= 20 ||
                "Please provide enough detail about the request.",
            })}
          />
          {errors.description && (
            <p className="mt-1.5 text-[10px] font-medium text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block  font-semibold text-slate-700">
              Requester Name <span className="text-red-500">*</span>
            </label>
            <input
              className=" h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              placeholder="Your full name"
              maxLength={60}
              {...register("requesterName", {
                required: "Requester name is required.",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters.",
                },
                maxLength: {
                  value: 60,
                  message: "Name cannot exceed 60 characters.",
                },
              })}
            />
            {errors.requesterName && (
              <p className="mt-1.5 text-[10px] font-medium text-red-500">
                {errors.requesterName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block  font-semibold text-slate-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              {...register("category", { required: "Category is required." })}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1.5 text-[10px] font-medium text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="lg:max-w-[50%] max-w-full">
          <label className="mb-1.5 block  font-semibold text-slate-700">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            {...register("priority", { required: "Priority is required." })}
          >
            <option value="">Select priority</option>
            {priorities.map((priority) => (
              <option key={priority}>{priority}</option>
            ))}
          </select>
          {errors.priority && (
            <p className="mt-1.5 text-[10px] font-medium text-red-500">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button type="submit" disabled={isSubmitting} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#3156d8] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2749c0] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                Submitting...
              </>
            ) : (
              <>
                <HiOutlinePaperAirplane size={14} />
                Submit Request
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}