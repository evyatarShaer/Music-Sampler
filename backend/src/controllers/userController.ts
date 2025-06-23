import { Request, Response } from "express";
import { IUser } from "../models/userModel";
import { updateUser } from "../services/userService";

export const editUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const newUser: Partial<IUser> = req.body;
    try {
        const updatedUser = await updateUser(userId, newUser);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
