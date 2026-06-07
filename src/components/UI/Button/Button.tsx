import { Button as MuiButton } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { baseButtonStyles } from "./styles";

export const Button = (props: ButtonProps) => {
  return <MuiButton variant="contained" sx={baseButtonStyles} {...props} />;
};
