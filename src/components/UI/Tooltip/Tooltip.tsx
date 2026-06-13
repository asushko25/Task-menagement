import { Tooltip as MuiTooltip } from "@mui/material";

type TooltipProps = {
  title: string;
  children: React.ReactElement;
};

export const Tooltip = ({ title, children }: TooltipProps) => {
  return (
    <MuiTooltip title={title} placement="top">
      {children}
    </MuiTooltip>
  );
};
