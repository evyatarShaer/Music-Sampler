import {
  IconButton,
  Box,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";

type ControlPanelProps = {
  isPlaying: boolean;
  bpm: number;
  onTogglePlay: () => void;
  onBpmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedInstrument: string;
  onInstrumentChange: (instrument: string) => void;
  onReset: () => void;
};

const ControlPanel = ({
  isPlaying,
  bpm,
  onTogglePlay,
  onBpmChange,
  selectedInstrument,
  onInstrumentChange,
  onReset,
}: ControlPanelProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      mb={3}
      gap={2}
      flexWrap="wrap"
      borderRadius={2}
      boxShadow={1}
      bgcolor="#f9f9f9"
    >
      <IconButton
        onClick={onTogglePlay}
        color={isPlaying ? "error" : "success"}
        size="large"
        title={isPlaying ? "Stop" : "Play"}
      >
        {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
      </IconButton>

      <Box display="flex" alignItems="center" gap={1}>
        <Slider
          value={bpm}
          min={60}
          max={200}
          onChange={(e, value) => {
            const target = {
              target: { value: value.toString() },
            } as React.ChangeEvent<HTMLInputElement>;
            onBpmChange(target);
          }}
          sx={{ width: 150, color: '#A0E7E5' }}
        />
        <Box fontSize={14}>{bpm} BPM</Box>
      </Box>

      <FormControl size="small">
        <InputLabel id="instrument-label">Instrument</InputLabel>
        <Select
          labelId="instrument-label"
          value={selectedInstrument}
          label="Instrument"
          onChange={(e) => onInstrumentChange(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="guitar">🎸 Guitar</MenuItem>
          <MenuItem value="drums">🥁 Drums</MenuItem>
          <MenuItem value="piano">🎹 Piano</MenuItem>
        </Select>
      </FormControl>

      <IconButton onClick={onReset} color="warning" size="large" title="Reset">
        <ReplayIcon />
      </IconButton>
    </Box>
  );
};

export default ControlPanel;
