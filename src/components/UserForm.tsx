import { Button, Stack, TextField } from "@mui/material";
import { AutocompleteController } from "./AutocompleteCotroller.tsx";
import { UserSchemaType } from "../schema/users-schema.ts";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { useStates } from "../services/queries.ts";

const UserForm = () => {
  const { register, watch, formState, handleSubmit } =
    useFormContext<UserSchemaType>();
  const onSubmit = (formValues: UserSchemaType) => {
    console.log(formValues);
  };
  const stateQuery = useStates();
  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => sub.unsubscribe();
  }, [watch()]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          {...register("name")}
          label="Name"
          placeholder="name"
          error={!!formState.errors.email}
          helperText={formState.errors.name?.message}
        />
        <TextField
          {...register("email")}
          label="Email"
          error={!!formState.errors.email}
          placeholder="email"
          helperText={formState.errors.email?.message}
        />
        <AutocompleteController<UserSchemaType>
          options={stateQuery.data || []}
          label={"Email Address"}
          name="state"
        />
      </Stack>
      <Button type="submit">submit</Button>
    </form>
  );
};

export default UserForm;
