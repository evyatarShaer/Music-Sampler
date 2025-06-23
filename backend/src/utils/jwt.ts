import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, isAdmin: boolean): string => {
    return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
}
