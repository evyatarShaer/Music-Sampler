import { Box } from "@mui/material";

type CellProps = {
  isActive: boolean;
  isCurrent: boolean;
  onClick: () => void;
};

const Cell = ({ isActive, isCurrent, onClick }: CellProps) => {
  const backgroundColor = isCurrent
    ? isActive ? "#00f" : "#99f"
    : isActive ? "#0f0" : "#ccc";

  return (
    <Box
      onClick={onClick}
      sx={{
        width: 38,
        height: 38,
        bgcolor: backgroundColor,
        cursor: "pointer",
        borderRadius: 1,
        border: "1px solid #999",
        transition: "background-color 0.2s ease",
        boxSizing: "border-box",
      }}
    />
  );
};

export default Cell;
