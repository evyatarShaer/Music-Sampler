import { useState } from "react";
import { useGridPlayback } from "../../hooks/useGrid";
import ControlPanel from "../ControlPanel/ControlPanel";
import MusicGrid from "../grid/Grid";

const MusicSampler = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatsPerMinute, setBeatsPerMinute] = useState(120);
  const selectedInstrument = "electric-guitar";

  const {
    grid: musicGrid,
    toggleCell: handleCellToggle,
    currentCol: activeColumn,
  } = useGridPlayback(selectedInstrument, isPlaying, beatsPerMinute);

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeatsPerMinute(Number(event.target.value));
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
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
      />
    </div>
  );
};

export default MusicSampler;
