import { Box } from "@mui/material";
import Cell from "../cell/Cell";

type MusicGridProps = {
  musicGrid: boolean[][];
  activeColumn: number;
  onCellToggle: (rowIndex: number, columnIndex: number) => void;
};

const MusicGrid = ({ musicGrid, activeColumn, onCellToggle }: MusicGridProps) => {
  const numberOfColumns = musicGrid[0]?.length || 0;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${numberOfColumns}, 40px)`}
        gap={0.625}
        p={1.5}
        bgcolor="#f0f0f0"
        borderRadius={2}
        boxShadow="inset 0 0 5px rgba(0,0,0,0.05)"
      >
        {musicGrid.map((gridRow, rowIndex) =>
          gridRow.map((isCellActive, columnIndex) => (
            <Cell
              key={`cell-${rowIndex}-${columnIndex}`}
              isActive={isCellActive}
              isCurrent={columnIndex === activeColumn}
              onClick={() => onCellToggle(rowIndex, columnIndex)}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default MusicGrid;
