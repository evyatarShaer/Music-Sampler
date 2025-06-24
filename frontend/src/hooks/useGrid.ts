import { useEffect, useState } from 'react';
import { playSampleNote } from './useSampler';

const NOTE_ROWS = [
  'C4', 'D4', 'E4', 'F4',
  'G4', 'A4', 'B4', 'C5',
];
const TOTAL_COLUMNS = 16;

export function useGridPlayback(instrumentName: string, isPlaying: boolean, bpm: number) {
  const [noteGrid, setNoteGrid] = useState<boolean[][]>(
    Array(NOTE_ROWS.length).fill(null).map(() => Array(TOTAL_COLUMNS).fill(false))
  );
  const [activeColumn, setActiveColumn] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      NOTE_ROWS.forEach((note, rowIndex) => {
        if (noteGrid[rowIndex][activeColumn]) {
          playSampleNote(instrumentName, note);
        }
      });

      setActiveColumn((prevCol) => (prevCol + 1) % TOTAL_COLUMNS);
    }, 60_000 / bpm); // Convert BPM to interval (ms)

    return () => clearInterval(interval);
  }, [isPlaying, bpm, activeColumn, noteGrid, instrumentName]);

  const toggleNoteCell = (rowIndex: number, columnIndex: number) => {
    const updatedGrid = noteGrid.map((row, rIdx) =>
      row.map((isActive, cIdx) =>
        rIdx === rowIndex && cIdx === columnIndex ? !isActive : isActive
      )
    );
    setNoteGrid(updatedGrid);
  };

  return {
    grid: noteGrid,
    toggleCell: toggleNoteCell,
    currentCol: activeColumn
  };
}
