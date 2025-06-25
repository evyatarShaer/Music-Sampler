import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
export const getSound = async (note: string): Promise<Blob | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/app/audio/guitar/${note}`, {
      responseType: 'blob',
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to load or play note ${note}:`, error);
  }
}