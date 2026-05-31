import { Typography } from "@mui/material";
import { titleStyles } from "../TaskTable/styles";
import { strings } from "./helpers";

export const Header = () => {
  return (
    <Typography variant="h1" sx={titleStyles}>
      {strings.title}
    </Typography>
  );
};
