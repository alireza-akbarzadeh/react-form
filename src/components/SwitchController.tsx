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
  const { control } = useFormContext<TName>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<Switch {...field} checked={field.value} />}
        />
      )}
    />
  );
}
