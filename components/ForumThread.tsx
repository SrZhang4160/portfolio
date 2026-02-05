"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn, formatRelativeTime } from "@/lib/utils";

interface Reply {
  id: string;
  content: string;
  authorName: string;
  parentId: string | null;
  createdAt: string;
}

interface Thread {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  replies: Reply[];
}

interface ForumThreadProps {
  thread: Thread;
}

const replyFormSchema = z.object({
  content: z.string().min(1, "Reply is required").max(5000),
  authorName: z.string().min(1, "Name is required").max(100),
  authorEmail: z.string().email().optional().or(z.literal("")),
});

type ReplyFormData = z.infer<typeof replyFormSchema>;

export default function ForumThread({ thread }: ForumThreadProps) {
  const [replies] = useState<Reply[]>(thread.replies);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyFormData>({
    resolver: zodResolver(replyFormSchema),
  });

  const onSubmit = async (data: ReplyFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`/api/forum/${thread.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          parentId: replyingTo,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setReplyingTo(null);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Organize replies into nested structure (max 2 levels)
  const topLevelReplies = replies.filter((r) => !r.parentId);
  const nestedReplies = (parentId: string) =>
    replies.filter((r) => r.parentId === parentId);

  return (
    <div className="space-y-8">
      {/* Thread Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-primary-900 mb-4">
          {thread.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="font-medium text-primary-700">
            {thread.authorName}
          </span>
          <span>•</span>
          <span>{formatRelativeTime(thread.createdAt)}</span>
        </div>
        <div className="prose max-w-none whitespace-pre-wrap">
          {thread.content}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setReplyingTo(null)}
            className="text-sm font-medium text-primary-600 hover:text-primary-800"
          >
            Reply to thread
          </button>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="font-semibold text-primary-900">
          Replies ({replies.length})
        </h2>

        {topLevelReplies.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No replies yet. Be the first to respond!
          </div>
        ) : (
          topLevelReplies.map((reply) => (
            <div key={reply.id} className="space-y-3">
              {/* Top-level reply */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3 text-sm mb-2">
                  <span className="font-medium text-primary-700">
                    {reply.authorName}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">
                    {formatRelativeTime(reply.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {reply.content}
                </p>
                <button
                  onClick={() => setReplyingTo(reply.id)}
                  className="mt-3 text-sm text-primary-600 hover:text-primary-800"
                >
                  Reply
                </button>
              </div>

              {/* Nested replies */}
              {nestedReplies(reply.id).map((nestedReply) => (
                <div
                  key={nestedReply.id}
                  className="ml-8 bg-gray-50 rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-3 text-sm mb-2">
                    <span className="font-medium text-primary-700">
                      {nestedReply.authorName}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">
                      {formatRelativeTime(nestedReply.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {nestedReply.content}
                  </p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Reply Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-primary-900 mb-4">
          {replyingTo
            ? `Replying to ${
                replies.find((r) => r.id === replyingTo)?.authorName
              }`
            : "Post a Reply"}
        </h3>
        {replyingTo && (
          <button
            onClick={() => setReplyingTo(null)}
            className="text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            ← Reply to main thread instead
          </button>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reply <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              rows={4}
              {...register("content")}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none",
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
            {isSubmitting ? "Posting..." : "Post Reply"}
          </button>

          {submitStatus === "success" && (
            <div className="p-3 bg-green-50 text-green-800 rounded-lg text-sm">
              Thanks! Your reply will appear after moderation.
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
