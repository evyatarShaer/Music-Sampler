import { Request, Response } from 'express';
import path from 'path';

export const getGuitarNote = (req: Request, res: Response) => {
  const note = req.params.note;
  const filePath = path.join(__dirname, '..', 'audio', 'guitar', `${note}.wav`);
  res.sendFile(filePath, err => {
    if (err) {
      console.error('Failed to send file:', err);
      res.status(404).send('File not found');
    }
  });
};
