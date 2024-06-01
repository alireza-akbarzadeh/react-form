import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

type DTPickerControllerProps<TName extends FieldValues> = {
  name: Path<TName>;
};

export function DRPickerController<TName extends FieldValues>(
  props: DTPickerControllerProps<TName>,
) {
  const { name } = props;
  const { control } = useFormContext<TName>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...restFields } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            {...restFields}
            value={Array.isArray(value) ? value : [null, null]}
          />
        </LocalizationProvider>
      )}
    />
  );
}
