import { Box, ToggleButton, Tooltip } from "@mui/material";
import { strings } from "./helpers";
import { toggleButtonStyles } from "./styles";

interface HeaderProps {
  themeMode: "light" | "dark";
  setThemeMode: (mode: "light" | "dark") => void;
}

export const Header = ({ themeMode, setThemeMode }: HeaderProps) => {
  return (
    <Box sx={toggleButtonStyles}>
      <Tooltip title={strings.toggleTooltip} placement="right">
        <ToggleButton
          value="check"
          aria-label="toggle theme"
          selected={themeMode === "dark"}
          onChange={() =>
            setThemeMode(themeMode === "light" ? "dark" : "light")
          }
        >
          {themeMode === "light"
            ? strings.whiteModeToggle
            : strings.darkModeToggle}
        </ToggleButton>
      </Tooltip>
    </Box>
  );
};
