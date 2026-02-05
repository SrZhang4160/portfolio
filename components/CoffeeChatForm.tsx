"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coffeeChatSchema, CoffeeChatInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

export default function CoffeeChatForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CoffeeChatInput>({
    resolver: zodResolver(coffeeChatSchema),
  });

  const onSubmit = async (data: CoffeeChatInput) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/coffee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  if (submitStatus === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">☕</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Request Received!
        </h3>
        <p className="text-green-700">
          Thanks for reaching out! I&apos;ll review your request and get back to you
          soon to schedule our chat.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors",
              errors.name ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors",
              errors.email ? "border-red-500" : "border-gray-300"
            )}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            id="company"
            {...register("company")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Where you work"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            id="role"
            {...register("role")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Your role"
          />
        </div>
      </div>

      {/* Topic */}
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          What would you like to discuss? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="topic"
          rows={3}
          {...register("topic")}
          className={cn(
            "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none",
            errors.topic ? "border-red-500" : "border-gray-300"
          )}
          placeholder="Healthcare AI, career advice, robotics, 3D printing, or anything else..."
        />
        {errors.topic && (
          <p className="mt-1 text-sm text-red-500">{errors.topic.message}</p>
        )}
      </div>

      {/* Preferred Time */}
      <div>
        <label
          htmlFor="preferredTime"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Preferred Time <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="preferredTime"
          {...register("preferredTime")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="e.g., Weekday afternoons PST"
        />
      </div>

      {/* Additional Notes */}
      <div>
        <label
          htmlFor="additionalNotes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Anything else? <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="additionalNotes"
          rows={2}
          {...register("additionalNotes")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
          placeholder="Any additional context..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full px-6 py-3 bg-accent-500 text-white font-semibold rounded-lg transition-colors",
          isSubmitting
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-accent-600"
        )}
      >
        {isSubmitting ? "Sending..." : "Request Coffee Chat"}
      </button>

      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg">
          Something went wrong. Please try again or email me directly.
        </div>
      )}
    </form>
  );
}
