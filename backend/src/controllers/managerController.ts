import { Request, Response } from "express";
import { getAllUsersService, deleteUserService } from "../services/userService";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users', error);
        res.status(500).json("Server error");
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void>=> {
    try {
        const user = await deleteUserService(req.params.id);
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json("Server error");
    }
};
