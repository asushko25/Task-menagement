import { Autocomplete, TextField, type SxProps } from "@mui/material";

type SelectFieldProps<T extends string> = {
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  sx?: SxProps;
};

export const SelectField = <T extends string>({
  label,
  options,
  value,
  onChange,
  sx,
}: SelectFieldProps<T>) => {
  return (
    <Autocomplete
      sx={sx}
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
    />
  );
};
