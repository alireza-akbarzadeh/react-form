import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

type SwitchControllerProps<TName extends FieldValues> = {
  name: Path<TName>;
  label: string;
};

export function SwitchController<TName extends FieldValues>(
  props: SwitchControllerProps<TName>,
) {
  const { name, label } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} checked={field.value} />}
          label={label}
        />
      )}
    />
  );
}
