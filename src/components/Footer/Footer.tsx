import { Typography } from "@mui/material";
import { strings } from "./helpers";
import { footerStyles } from "./styles";

export const Footer = () => {
  return (
    <Typography variant="body2" align="center" sx={footerStyles}>
      {strings.footer}
    </Typography>
  );
};
