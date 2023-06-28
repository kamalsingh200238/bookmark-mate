import { Response, Request } from 'express';
import Joi from 'joi';
import User from '../models/User';
import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config(); // setting up dotenv to use .env varaible

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  // schema for validating username, email and password
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  // check the varaibles against schema
  const { error } = schema.validate({ username, email, password });
  if (error) {
    // if there are errors in data
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Check if the user alreay exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // If user already exists
      return res.status(400).json({
        message: 'user with this email already exist, use another email',
      });
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
      _id: user._id,
      username,
      email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // schema to validate the data in body
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  // validate the data against schema
  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      return res
        .status(404)
        .json({ message: "User with this email doesn't exists" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password); // check if the passwords match
    if (!passwordMatch) {
      // if password don't match
      res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token for the newly created user using the generateJWT method
    const token = user.generateJWT();

    // Set the JWT token as a cookie in the response
    res.cookie('token', token).status(201).json({
      _id: user._id,
      username: user.username,
      email,
    });
  } catch (error) {
    console.log('There was an error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// export const profile = async (req: Request, res: Response) => {
//   console.log('Token:', req.cookies.token);
//
//   jwt.verify(req.cookies.token, secret, {}, (error, user) => {
//     if (error) {
//       console.log(error);
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     res.json(user);
//   });
// };

// export const logout = async (req: Request, res: Response) => {
//   console.log('Token:', req.cookies.token);
//
//   console.log('logging out');
//   res.cookie('token', '').json('ok'); //sets "token" to empty/invalid
// };
