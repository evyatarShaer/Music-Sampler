export const playSampleNote = async (instrument: string, note: string) => {
  const audio = new Audio(`http://localhost:3000/api/audio/${instrument}/${note}`);
  await audio.play();
};
