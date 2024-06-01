import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Fragment, useEffect } from "react";

import {
  defaultUserSchema,
  UserSchemaType,
} from "../../schema/users-schema.ts";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../../services/queries.ts";
import {
  AutocompleteController,
  CheckboxController,
  DRPickerController,
  DTPickerController,
  RadioController,
  SliderController,
  SwitchController,
  TextFieldController,
  ToggleButtonController,
} from "../../controller";
import { useCreateUser, useEditUser } from "../../services/mutations.ts";

const UserForm = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const { data } = useUsers();

  const { control, unregister, reset, setValue, handleSubmit } =
    useFormContext<UserSchemaType>();

  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });

  const userQuery = useUser(id);

  const isTeacher = useWatch({ control, name: "isTeacher" });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const handleReset = () => {
    reset(defaultUserSchema);
  };

  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const onSubmit: SubmitHandler<UserSchemaType> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={<IconButton aria-label="settings">icon</IconButton>}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <List subheader={<ListSubheader>Users</ListSubheader>}>
            {data?.map((user) => (
              <ListItem disablePadding key={user.id}>
                <ListItemButton
                  onClick={() => handleUserClick(user.id)}
                  selected={id === user.id}
                >
                  <ListItemText primary={user.label}>{user?.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
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
              options={statesQuery.data || []}
              label="Email Address"
              name="states"
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

            {isTeacher && (
              <Button onClick={() => append({ name: "" })} type="button">
                Add new student
              </Button>
            )}
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <TextFieldController<UserSchemaType>
                  name={`students.${index}.name`}
                  label="Name"
                />
                <Button
                  color="error"
                  onClick={() => {
                    remove(index);
                  }}
                  type="button"
                >
                  Remove
                </Button>
              </Fragment>
            ))}

            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button variant="contained" type="submit">
                {variant === "create" ? "New user" : "Edit user"}
              </Button>
              <Button onClick={handleReset}>Reset</Button>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
