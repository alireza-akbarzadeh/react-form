import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Options } from "../types/options.ts";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type RadioControllerControllerProps<TName extends FieldValues> = {
  name: Path<TName>;
  options: Options[];
  label: string;
};

export function RadioController<TName extends FieldValues>(
  props: RadioControllerControllerProps<TName>,
) {
  const { name, options, label } = props;
  const { control } = useFormContext<TName>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio checked={field.value === option.id} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}
