import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface Payload {
  userId: string;
  username: string;
  email: string;
}

export interface AuthInfoRequest extends Request {
  user: Payload;
}

export const auth = async (
  req: AuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  // get the token from cookies
  const token = req.cookies.token;

  try {
    // extract user info from jwt token
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Payload;

    // attach the user to the request
    req.user = { userId: payload.userId, username: payload.username, email: payload.email };

    // call the next function
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Authentication invalid' });
  }
};
