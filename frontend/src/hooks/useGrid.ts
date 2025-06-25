import { useEffect, useState } from "react";
import { getSound } from "../api/getSound";
import { playNote } from "../utils/playSound";

const NOTE_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const TOTAL_COLUMNS = 16;

const createEmptyGrid = () =>
  Array(NOTE_ROWS.length)
    .fill(null)
    .map(() => Array(TOTAL_COLUMNS).fill(false));

export function useGridPlayback(
  instrumentName: string,
  isPlaying: boolean,
  bpm: number
) {
  const [noteGrid, setNoteGrid] = useState<boolean[][]>(
    Array(NOTE_ROWS.length)
      .fill(null)
      .map(() => Array(TOTAL_COLUMNS).fill(false))
  );
  const [activeColumn, setActiveColumn] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      NOTE_ROWS.forEach(async (note, rowIndex) => {
        if (noteGrid[rowIndex][activeColumn]) {
          const blob = await getSound(note);
          playNote(blob);
        }
      });

      setActiveColumn((prevCol) => (prevCol + 1) % TOTAL_COLUMNS);
    }, 60_000 / bpm);

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

  const resetGrid = () => {
    setNoteGrid(createEmptyGrid());
    setActiveColumn(0);
  };

  return {
    grid: noteGrid,
    toggleCell: toggleNoteCell,
    currentCol: activeColumn,
    resetGrid,
  };
}
