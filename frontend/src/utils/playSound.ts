export const playNote = async (audioBlob: Blob | undefined) => {
  if (audioBlob === undefined) return;
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();

  audio.onended = () => {
    URL.revokeObjectURL(audioUrl);
  };
};
