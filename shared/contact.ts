import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Invalid email").max(254),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(8000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface ContactResponse {
  ok: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}
