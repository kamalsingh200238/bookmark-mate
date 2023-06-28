import { Response, Request } from 'express';
import User from '../models/User';
import * as bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user alreay exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      // If user already exists
      return res.status(400).json({
        message: 'user with this email already exist, use another email',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // If the user doesn't exist, create a new user with the provided username, email, and hashedPassword
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
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
