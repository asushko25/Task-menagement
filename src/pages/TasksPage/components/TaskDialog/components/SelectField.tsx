import { Autocomplete, TextField, type SxProps } from "@mui/material";

type TaskSelectFieldProps<T extends string> = {
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  sx?: SxProps;
};

export const TaskSelectField = <T extends string>({
  label,
  options,
  value,
  onChange,
  sx,
}: TaskSelectFieldProps<T>) => {
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
