import { Router } from "express";
import { isAdminMiddleware } from "../middleware/authMidlleware";
import { getAllUsers, deleteUser } from "../controllers/managerController";

const router = Router();

router.get('/allUsers', isAdminMiddleware, getAllUsers);
router.put('/user/:id', isAdminMiddleware, deleteUser);

export default router;