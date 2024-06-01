import * as z from "zod";

export const UserSchema = z.object({
  name: z.string().min(5, { message: "Name is required" }),
  age: z.number().optional(),
  date: z.date().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  state: z.array(z.string()).min(1).max(2),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1, { message: "Gender is required" }),
  skills: z
    .array(z.string())
    .max(2, { message: "you only required to select 2 skills" }),
  registrationDateAndTime: z.date(),
  formerEmploymentPeriod: z
    .array(z.date())
    .min(2, { message: "required to select to fields" })
    .max(2, { message: "required to select to fields" }),
  salaryRange: z.array(
    z
      .number()
      .min(1, { message: "required to select to salary range" })
      .max(2, { message: "required to select to salary range" }),
  ),
  isTeacher: z.boolean(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const defaultUserSchema: UserSchemaType = {
  state: [],
  email: "",
  name: "",
  age: 0,
  date: new Date(),
  languagesSpoken: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: true,
};
