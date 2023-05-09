import express from 'express';
import { Response, Request } from 'express';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config(); // setting up dotenv to use .env varaible

// import { genSalt, hash } from "bcrypt-ts";
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
const secret = process.env.SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log('req.body', req.body);
  console.log('username', username, 'email', email, 'password', password);

  try {
    // Check if a user with the provided username or email already exists in the database
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      // If a user with the given username or email exists, return an error message
      return res.json('User already exists');
    }
    // If the user doesn't exist, create a new user with the provided username, email, and password
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    // Generate a JWT token for the newly created user using the generateJWT method
    const token = user.generateJWT();

    // Set the JWT token as a cookie in the response
    res.cookie('token', token).status(201).json({
      id: user._id,
      username,
      email,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ username, email }).exec();

  if (!user) {
    // User not found
    return res.status(400).json({ message: 'Invalid login credentials.' });
  }
  console.log('trying to login', secret, user);

  jwt.sign({ username, email, id: user._id }, secret, {}, (err, token) => {
    //this token gets used in /profile
    if (err) throw err;
    console.log('token before', token);
    res.cookie('token', token).json({
      id: user._id,
      username,
      email,
    });
    console.log('token after', token);
  });
};

export const profile = async (req: Request, res: Response) => {
  console.log('Token:', req.cookies.token);

  jwt.verify(req.cookies.token, secret, {}, (error, user) => {
    if (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.json(user);
  });
};

export const logout = async (req: Request, res: Response) => {
  console.log('Token:', req.cookies.token);

  console.log('logging out');
  res.cookie('token', '').json('ok'); //sets "token" to empty/invalid
};
