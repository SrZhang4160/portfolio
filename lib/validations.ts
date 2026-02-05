import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1, "Comment is required").max(2000),
  authorName: z.string().min(1, "Name is required").max(100),
  authorEmail: z.string().email().optional().or(z.literal("")),
  targetType: z.enum(["work", "print"]),
  targetSlug: z.string().min(1).max(100),
});

export const commentStatusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
});

export const threadSchema = z.object({
  topic: z.enum(["ai-healthcare", "3d-printing", "sports"]),
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(10000),
  authorName: z.string().min(1, "Name is required").max(100),
  authorEmail: z.string().email().optional().or(z.literal("")),
});

export const replySchema = z.object({
  content: z.string().min(1, "Reply is required").max(5000),
  authorName: z.string().min(1, "Name is required").max(100),
  authorEmail: z.string().email().optional().or(z.literal("")),
  parentId: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(1, "Message is required").max(5000),
  honeypot: z.string().max(0).optional(), // Should be empty (spam protection)
});

export const coffeeChatSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional().or(z.literal("")),
  role: z.string().max(100).optional().or(z.literal("")),
  topic: z.string().min(1, "Topic is required").max(500),
  preferredTime: z.string().max(200).optional().or(z.literal("")),
  additionalNotes: z.string().max(2000).optional().or(z.literal("")),
});

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type CommentInput = z.infer<typeof commentSchema>;
export type ThreadInput = z.infer<typeof threadSchema>;
export type ReplyInput = z.infer<typeof replySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CoffeeChatInput = z.infer<typeof coffeeChatSchema>;
