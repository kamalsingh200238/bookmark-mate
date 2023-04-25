import express from 'express'
import { Response, Request } from 'express';
// import bcrypt from "bcryptjs";
import User from '../models/User';


const app = express();
app.use(express.json());

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log("req.body",req.body)
    console.log("username",username,"email",email,"password",password)

    try {
        const userExists = await User.findOne({ $or: [{ username, email }] })
        if (userExists) {
            res.json("User already exists")
        }
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

