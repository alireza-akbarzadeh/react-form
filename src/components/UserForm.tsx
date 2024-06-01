import { Button, Stack, Typography } from "@mui/material";
import { AutocompleteController } from "./AutocompleteCotroller.tsx";
import { UserSchemaType } from "../schema/users-schema.ts";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries.ts";
import { ToggleButtonController } from "./ToggleButtonController.tsx";
import { RadioController } from "./RadioController.tsx";
import { CheckboxController } from "./CheckboxController.tsx";
import { DTPickerController } from "./DTPickerController.tsx";
import { DRPickerController } from "./DRPickerController.tsx";
import { SliderController } from "./SliderController.tsx";
import { SwitchController } from "./SwitchController.tsx";
import { TextFieldController } from "./TextFieldController.tsx";

const UserForm = () => {
  const { watch, handleSubmit } = useFormContext<UserSchemaType>();
  const onSubmit = (formValues: UserSchemaType) => {
    console.log(formValues);
  };
  const stateQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextFieldController<UserSchemaType>
          name="name"
          label="Name"
          placeholder="Enter your name"
        />
        <TextFieldController<UserSchemaType>
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <AutocompleteController<UserSchemaType>
          options={stateQuery.data || []}
          label="Email Address"
          name="state"
        />
        <ToggleButtonController<UserSchemaType>
          name={"languagesSpoken"}
          options={languagesQuery.data || []}
        />
        <RadioController<UserSchemaType>
          name="gender"
          options={gendersQuery.data || []}
          label="Gender"
        />
        <CheckboxController<UserSchemaType>
          name="skills"
          options={skillsQuery.data || []}
          label="Skills"
        />
        <DTPickerController<UserSchemaType>
          label="Registration Date & Time"
          name="registrationDateAndTime"
        />
        <Typography>Former Employment Period:</Typography>
        <DRPickerController<UserSchemaType> name="formerEmploymentPeriod" />
        <SliderController<UserSchemaType>
          name="salaryRange"
          label="Salary Range"
        />
        <SwitchController<UserSchemaType>
          name="isTeacher"
          label="Are you Teacher"
        />
        <Button variant="contained" type="submit">
          submit
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
