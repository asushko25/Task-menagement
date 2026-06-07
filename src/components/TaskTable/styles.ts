import type { SxProps } from "@mui/material/styles";
import { appColors } from "../../styles/styles";



export const tableContainerStyles: SxProps = {
  border: `1px solid ${appColors.borderDefault}`,
  borderRadius: 2,
  overflowX: "auto",
};

export const tableStyles: SxProps = {
  tableLayout: "auto",
  width: "max-content",
  minWidth: "100%",
};

export const baseCellStyles: SxProps = {
  whiteSpace: "nowrap",
};

export const headerRowStyles: SxProps = {
  // backgroundColor: appColors.surfaceMuted,
};

export const emptyStateCellStyles: SxProps = {
  color: "text.secondary",
};

export const editIconStyle: SxProps = {
  cursor: "pointer",
  fontSize: "medium",
  alignSelf: "center",
};
