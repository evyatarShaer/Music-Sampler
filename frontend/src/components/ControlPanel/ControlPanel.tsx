type ControlPanelProps = {
  isPlaying: boolean;
  bpm: number;
  onTogglePlay: () => void;
  onBpmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ControlPanel = ({ isPlaying, bpm, onTogglePlay, onBpmChange }: ControlPanelProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={onTogglePlay}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginRight: '15px',
          backgroundColor: isPlaying ? '#ff4444' : '#44ff44',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>

      <label style={{ fontSize: '14px' }}>
        <input
          type="range"
          min={60}
          max={200}
          value={bpm}
          onChange={onBpmChange}
          style={{ marginRight: '10px' }}
        />
        {bpm} BPM
      </label>
    </div>
  );
}

export default ControlPanel;