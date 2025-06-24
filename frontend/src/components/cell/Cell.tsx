type CellProps = {
  isActive: boolean;
  isCurrent: boolean;
  onClick: () => void;
};

const Cell = ({ isActive, isCurrent, onClick }: CellProps) => {
  const backgroundColor = isCurrent
    ? isActive ? '#00f' : '#99f'
    : isActive ? '#0f0' : '#ccc';

  return (
    <div
      onClick={onClick}
      style={{
        width: 38,
        height: 38,
        backgroundColor,
        cursor: 'pointer',
        borderRadius: 4,
        transition: 'background-color 0.2s ease',
        border: '1px solid #999'
      }}
    />
  );
}

export default Cell;