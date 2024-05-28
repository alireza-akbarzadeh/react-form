import * as z from "zod";
import { patterns } from "../constant/regex.ts";

export const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  date: z.date(),
  email: z
    .string()
    .min(3, { message: "Email is required" })
    .refine((text) => patterns.email.test(text)),
});
