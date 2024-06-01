import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Options } from "../types/options.ts";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

type CheckboxControllerProps<TName extends FieldValues> = {
  name: Path<TName>;
  options: Options[];
  label: string;
};

export function CheckboxController<TName extends FieldValues>(
  props: CheckboxControllerProps<TName>,
) {
  const { name, options, label } = props;
  const { control } = useFormContext<TName>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => {
                      if (value.includes(option.id)) {
                        onChange(
                          (value as string[]).filter((f) => f !== option.id),
                        );
                      } else {
                        onChange([...value, option.id]);
                      }
                    }}
                    checked={value.includes(option.id)}
                  />
                }
                label={option.label}
                key={option.id}
              />
            ))}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
