import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type DTPickerControllerProps<TName extends FieldValues> = {
  name: Path<TName>;
  label: string;
};

export function DTPickerController<TName extends FieldValues>(
  props: DTPickerControllerProps<TName>,
) {
  const { name, label } = props;
  const { control } = useFormContext<TName>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker label={label} {...field} />
        </LocalizationProvider>
      )}
    />
  );
}
