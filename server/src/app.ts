import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookmarks from './routes/bookmarks';
import auth from './routes/auth'; 
import cookieParser from 'cookie-parser';

dotenv.config(); // setting up dotenv to use .env varaible

const app = express();
const port = process.env.PORT ?? 3333; // if port not present in .env file then run on 3333

// middlewares
app.use(express.json()); // This will parse JSON data in incoming requests
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.send('Express + TypeScript Server which is typescript Now. ');
});

// routes
app.use('/api/v1/bookmarks/', bookmarks);
app.use('/api/v1/auth/', auth);

async function start() {
  const db = process.env.DB_STRING as string; //set db to the DB_STRING from the env file
  // connect to database
  await mongoose
    .connect(db)
    .then(() => console.log('MongoDB is connected'))
    .catch((error) =>
      console.log('There was an error connecting to MongoDB', error)
    );

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

start();
