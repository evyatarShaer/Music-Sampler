import { Router } from "express";
import { getGuitarNote } from '../controllers/guitarController';

const router = Router();

router.get('/audio/guitar/:note', getGuitarNote);

export default router;
