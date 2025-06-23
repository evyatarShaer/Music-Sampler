import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { editUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMidlleware";

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/edit/:id', authMiddleware, editUser);

export default router;