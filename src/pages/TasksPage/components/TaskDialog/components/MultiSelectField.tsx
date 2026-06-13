import { Autocomplete, TextField, type SxProps } from "@mui/material";

type Option = { id: string; label: string };

type MultiSelectFieldProps = {
  label: string;
  options: Option[];
  value: string[];
  onChange: (ids: string[]) => void;
  sx?: SxProps;
};

export const MultiSelectField = ({
  label,
  options,
  value,
  onChange,
  sx,
}: MultiSelectFieldProps) => {
  return (
    <Autocomplete
      multiple
      sx={sx}
      options={options}
      value={options.filter((o) => value.includes(o.id))}
      onChange={(_, selected) => onChange(selected.map((o) => o.id))}
      getOptionLabel={(o) => o.label}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
    />
  );
};
