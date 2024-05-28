import * as z from "zod";

export const UserSchema = z.object({
  name: z.string().min(5, { message: "Name is required" }),
  age: z.number().optional(),
  date: z.date().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  state: z.array(z.string()).min(1).max(2),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const defaultUserSchema: UserSchemaType = {
  state: [],
  email: "",
  name: "",
  age: 0,
  date: new Date(),
};
