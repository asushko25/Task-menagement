import { TextField } from "@mui/material";

type TaskTextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const TaskTextField = ({
  label,
  value,
  onChange,
}: TaskTextFieldProps) => {
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
