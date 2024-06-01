import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Slider, Typography } from "@mui/material";

type SliderControllerProps<TName extends FieldValues> = {
  name: Path<TName>;
  label: string;
};

export function SliderController<TName extends FieldValues>(
  props: SliderControllerProps<TName>,
) {
  const { name, label } = props;
  const { control } = useFormContext<TName>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider {...field} valueLabelDisplay="auto" />
        </>
      )}
    />
  );
}
