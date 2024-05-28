import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../schema/users.ts";
import * as z from "zod";
export function Users() {
  const { register, formState, handleSubmit } = useForm<
    z.infer<typeof UserSchema>
  >({
    defaultValues: {
      email: "devtools95@gmail.com",
      age: 0,
      date: new Date(),
      name: "",
    },
    resolver: zodResolver(UserSchema),
    mode: "all",
  });
  const onSubmit = (formValues: z.infer<typeof UserSchema>) => {
    console.log(formValues);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", {
          required: { value: true, message: "the email field is required" },
          maxLength: { value: 10, message: "too many characters" },
        })}
        placeholder="email"
      />
      <p>{formState.errors.name?.message}</p>
      <button>submit</button>
    </form>
  );
}
