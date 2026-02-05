"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

interface ForumNewThreadProps {
  topic: string;
  onSuccess?: () => void;
}

const threadFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(10000),
  authorName: z.string().min(1, "Name is required").max(100),
  authorEmail: z.string().email().optional().or(z.literal("")),
});

type ThreadFormData = z.infer<typeof threadFormSchema>;

export default function ForumNewThread({ topic, onSuccess }: ForumNewThreadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ThreadFormData>({
    resolver: zodResolver(threadFormSchema),
  });

  const onSubmit = async (data: ThreadFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          topic,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus(null);
          onSuccess?.();
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-6 py-4 bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
      >
        + Start a New Discussion
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">
          Start a New Discussion
        </h3>
        <button
          onClick={() => {
            setIsOpen(false);
            reset();
            setSubmitStatus(null);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
              errors.title ? "border-red-500" : "border-gray-300"
            )}
            placeholder="What do you want to discuss?"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            rows={6}
            {...register("content")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none",
              errors.content ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Share your thoughts, questions, or ideas..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Markdown formatting is supported.
          </p>
        </div>

        {/* Author Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="authorName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="authorName"
              {...register("authorName")}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                errors.authorName ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Your name"
            />
            {errors.authorName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.authorName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="authorEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="email"
              id="authorEmail"
              {...register("authorEmail")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="your@email.com"
            />
            <p className="mt-1 text-xs text-gray-500">
              Won&apos;t be displayed publicly.
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "px-6 py-2 bg-primary-900 text-white font-medium rounded-lg transition-colors",
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-700"
            )}
          >
            {isSubmitting ? "Posting..." : "Post Discussion"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              reset();
              setSubmitStatus(null);
            }}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>

        {submitStatus === "success" && (
          <div className="p-3 bg-green-50 text-green-800 rounded-lg text-sm">
            Thanks! Your discussion will appear after moderation.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="p-3 bg-red-50 text-red-800 rounded-lg text-sm">
            Something went wrong. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
