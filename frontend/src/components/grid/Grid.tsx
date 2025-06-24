import Cell from '../cell/Cell';

type MusicGridProps = {
  musicGrid: boolean[][];
  activeColumn: number;
  onCellToggle: (rowIndex: number, columnIndex: number) => void;
};

const MusicGrid = ({ musicGrid, activeColumn, onCellToggle }: MusicGridProps) => {
  const numberOfColumns = musicGrid[0]?.length || 0;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numberOfColumns}, 40px)`,
        gap: '2px',
        padding: '10px'
      }}
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
    </div>
  );
}

export default MusicGrid;