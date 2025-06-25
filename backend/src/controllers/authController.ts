import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import {
  createUserService,
  getUserByEmailService,
} from "../services/userService";
import { IUser } from "../models/userModel";
//import { sendEmail } from "../utils/sendMail";
import { isValidEmailDeep } from "../utils/validEmail";

export const registerUser = async (req: Request, res: Response) => {
  const newUserData: Partial<IUser> = req.body;
  if (newUserData.email) {
    const valid = isValidEmailDeep(newUserData.email);
    if (!valid) {
      res.status(400).json({ message: "Invalid email address" });
      return;
    }
  }
  try {
    const newUser = await createUserService(newUserData);
    //await sendEmail(newUser.email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json("Error registering user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const userExist = await getUserByEmailService(email);

    if (!userExist) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordCorrect = await userExist.comparePassword(password);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(userExist.id, userExist.isAdmin);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "logged in successfully",
      userExist,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
