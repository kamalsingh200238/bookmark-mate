import express from 'express'
import { Response, Request } from 'express';
import User from '../models/User';
// import { genSalt, hash } from "bcrypt-ts";
import jwt from 'jsonwebtoken'


const app = express();
app.use(express.json());
const secret=process.env.SECRET as string

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log("req.body", req.body)
    console.log("username", username, "email", email, "password", password)

    try {

        // async function hashPassword(password: string) {
        //     const salt = await genSalt(10)
        //     const hashedPassword = await hash(password, salt)
        //     return hashedPassword
        // }
        const userExists = await User.findOne({ $or: [{ username, email }] })
        if (userExists) {
            res.json("User already exists")
        }
        // const hashedPassword = await hashPassword(password)
        const user = await User.create({
            username: username,
            email: email,
            password: password
        });

        await user.save();
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });


    }

};

export const login = async (req: Request,res: Response) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username, email }).exec();
  
    if (!user) {
      // User not found
      return res.status(400).json({ message: "Invalid login credentials." });
    }
    console.log("trying to login", secret, user);
  
    
      jwt.sign(
        { username, email, id: user._id },
        secret,
        {},
        (err, token) => {
          //this token gets used in /profile
          if (err) throw err;
          console.log("token before", token);
          res
            .cookie("token", token, {
              sameSite: "none",
              secure: true,
            })
            .json({
              id: user._id,
              username,
              email,
            });
          console.log("token after", token);
        }
      );
     
}