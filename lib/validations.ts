import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name").max(100),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
