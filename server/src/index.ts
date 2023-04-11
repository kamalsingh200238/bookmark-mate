import express from 'express';
import { config } from 'dotenv';
import passport from 'passport'
import authRoutes from './routes/authRoutes'
import './config/passport';

config();

const app = express();
const port = process.env.PORT ?? 3333; // if port not present in .env file then run on 3333

//render page to client
app.set('view engine', 'ejs')

//render login page, all routes in authRoutes will be prefixed by /auth
app.use('/auth', authRoutes)

//route handler
//render home page
app.get('/', (req, res) => {
  //res.send('Express + TypeScript Server which is typescript Now. ');
  res.render('home')
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
