import { TextField } from "@mui/material";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const FormTextField = ({
  label,
  value,
  onChange,
}: TextFieldProps) => {
  return (
    <TextField
      value={value}
      label={label}
      fullWidth
      margin="normal"
      multiline
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
