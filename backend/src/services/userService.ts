import userModel, { IUser } from "../models/userModel";

export const createUserService = async (user: Partial<IUser>): Promise<IUser> => {
  if (!user.email) throw new Error("user email is required");
  const existingUser = await getUserByEmailService(user.email);
  if (existingUser?.isDeleted) throw new Error ("user is already deleted");
  if (existingUser) {
    throw new Error("User already exists");
  }
  const newUser = new userModel(user);
  return await newUser.save();
};

export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  return await userModel.findById(id);
};

export const getUserByNameService = async (username: string): Promise<IUser | null> => {
  return await userModel.findOne({ username });
};

export const getUserByEmailService = async (email: string): Promise<IUser | null> => {
  const user =  await userModel.findOne({ email });
  if (user) {
    if (user.isDeleted) throw new Error("user is already deleted");
  }
  return user;
};

export const getAllUsersService = async (): Promise<IUser[]> => {
  return await userModel.find();
};

export const updateUser = async ( id: string, updatedUser: Partial<IUser>): Promise<IUser | null> => {
  return await userModel.findByIdAndUpdate(id, updatedUser, { new: true });
};

export const deleteUserService = async (id: string): Promise<IUser | null> => {
  return await userModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
