import { FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultUserSchema,
  UserSchema,
  UserSchemaType,
} from "../schema/users-schema.ts";
import { DevTool } from "@hookform/devtools";

type FormProps = {
  children?: ReactNode;
};
export const UserContext = (props: FormProps) => {
  const { children } = props;
  const methods = useForm<UserSchemaType>({
    mode: "all",
    resolver: zodResolver(UserSchema),
    defaultValues: defaultUserSchema,
  });
  return (
    <FormProvider {...methods}>
      {children}
      <DevTool control={methods.control} />
    </FormProvider>
  );
};
