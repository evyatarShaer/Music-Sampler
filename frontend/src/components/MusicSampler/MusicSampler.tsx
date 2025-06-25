import { useState } from "react";
import { useGridPlayback } from "../../hooks/useGrid";
import ControlPanel from "../ControlPanel/ControlPanel";
import MusicGrid from "../grid/Grid";

const MusicSampler = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatsPerMinute, setBeatsPerMinute] = useState(120);
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");

  const {
    grid: musicGrid,
    toggleCell: handleCellToggle,
    currentCol: activeColumn,
    resetGrid,
  } = useGridPlayback(selectedInstrument, isPlaying, beatsPerMinute);

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeatsPerMinute(Number(event.target.value));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setBeatsPerMinute(120);
    setSelectedInstrument("guitar");
    resetGrid();
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <MusicGrid
        musicGrid={musicGrid}
        onCellToggle={handleCellToggle}
        activeColumn={activeColumn}
      />
      <ControlPanel
        isPlaying={isPlaying}
        bpm={beatsPerMinute}
        onTogglePlay={handlePlayToggle}
        onBpmChange={handleBpmChange}
        selectedInstrument={selectedInstrument}
        onInstrumentChange={setSelectedInstrument}
        onReset={handleReset}
      />
    </div>
  );
};

export default MusicSampler;
