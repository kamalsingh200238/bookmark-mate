import express from 'express'
import { Response, Request } from 'express';
import User from '../models/User';


const app = express();
app.use(express.json());

export const register = async (req: Request, res: Response) => {
  res.send('test mvc structure');
  console.log("'/api/v1/bookmarks' This api is working fine.");
};

