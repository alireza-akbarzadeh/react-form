import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type TextFieldControllerProps<TName extends FieldValues> = TextFieldProps & {
  name: Path<TName>;
};

export function TextFieldController<TName extends FieldValues>(
  props: TextFieldControllerProps<TName>,
) {
  const { name, ...textFieldProps } = props;
  const { control } = useFormContext<TName>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          error={!!error}
          helperText={error?.message}
          {...textFieldProps}
          {...field}
        />
      )}
    />
  );
}
