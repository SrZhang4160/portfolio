"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn, formatRelativeTime } from "@/lib/utils";

interface Comment {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
}

interface CommentSectionProps {
  targetType: "work" | "print";
  targetId: string;
}

const commentFormSchema = z.object({
  content: z.string().min(1, "Comment is required").max(2000),
  authorName: z.string().min(1, "Name is required").max(100),
  authorEmail: z.string().email().optional().or(z.literal("")),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

export default function CommentSection({
  targetType,
  targetId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
  });

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/comments?targetType=${targetType}&targetSlug=${targetId}`
      );
      const data = await response.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [targetType, targetId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onSubmit = async (data: CommentFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          targetType,
          targetSlug: targetId,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-primary-900">Comments</h3>

      {/* Comment List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            Loading comments...
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-primary-900">
                  {comment.authorName}
                </span>
                <span className="text-sm text-gray-500">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-primary-900 mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="authorName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="authorName"
              {...register("authorName")}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors",
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

          {/* Email (optional) */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="your@email.com"
            />
            <p className="mt-1 text-xs text-gray-500">
              Your email won&apos;t be displayed publicly.
            </p>
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              rows={4}
              {...register("content")}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none",
                errors.content ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Share your thoughts..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit */}
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
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-3 bg-green-50 text-green-800 rounded-lg text-sm">
              Thanks for your comment! It will appear after moderation.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-3 bg-red-50 text-red-800 rounded-lg text-sm">
              Something went wrong. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
