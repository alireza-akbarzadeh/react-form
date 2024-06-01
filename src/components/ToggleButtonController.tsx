import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Options } from "../types/options.ts";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type ToggleButtonControllerProps<TName extends FieldValues> = {
  name: Path<TName>;
  options: Options[];
};

export function ToggleButtonController<TName extends FieldValues>(
  props: ToggleButtonControllerProps<TName>,
) {
  const { name, options } = props;
  const { control } = useFormContext<TName>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restFields } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            if (newValue.length) {
              onChange(newValue);
            }
          }}
          value={value.length ? value : [options?.[0]?.id]}
          {...restFields}
        >
          {options?.map((option) => (
            <ToggleButton value={option.id} key={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
}
