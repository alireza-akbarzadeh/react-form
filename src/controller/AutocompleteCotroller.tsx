import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Options } from "../types/options.ts";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface AutocompleteControllerProps<TName> {
  options: Options[];
  label: string;
  name: Path<TName>;
}

export const AutocompleteController = <TName extends FieldValues>({
  options,
  name,
  label,
}: AutocompleteControllerProps<TName>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          value={value.map((val: string) =>
            options?.find((item) => item.id === val),
          )}
          onChange={(_, newValues) => {
            onChange(newValues.map((val) => val.id));
          }}
          getOptionLabel={(option) =>
            options.find((item) => item.id === option.id)?.label ?? ""
          }
          disableCloseOnSelect
          multiple
          options={options}
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              fullWidth
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component="li" {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlank />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
};
