"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validations";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          {...register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 bg-transparent text-lg transition-colors"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 bg-transparent text-lg transition-colors"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-500 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:ring-0 bg-transparent text-lg transition-colors resize-none"
          placeholder="Your message..."
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3 bg-primary-900 text-white font-medium rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <p className="text-green-600">Thanks for your message! I&apos;ll get back to you soon.</p>
      )}
      {submitStatus === "error" && (
        <p className="text-red-500">Something went wrong. Please try again or email me directly.</p>
      )}
    </form>
  );
}
