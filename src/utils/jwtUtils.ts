import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, 'SECRET', { expiresIn: '1h' });
};
