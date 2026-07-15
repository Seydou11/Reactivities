import { z } from "zod";
export const profileSchema = z.object({
  displayName: z.string().trim().min(1, "Display Name is required").max(100),
  bio: z.string().max(1000).optional(),
});
export type ProfileSchema = z.infer<typeof profileSchema>;
