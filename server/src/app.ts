import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import auth from './routes/auth';
import bookmarks from './routes/bookmarks';

dotenv.config(); // setting up dotenv to use .env variable
const app = express();
const port = process.env.PORT ?? 3333; // if port not present in .env file then run on 3333
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // enable cors
app.use(express.json()); // This will parse JSON data in incoming requests
app.use(cookieParser()); // This will parse cookies in incoming requests

app.get('/', (_req, res) => {
  res.send('This is the / route');
});

// routes
app.use('/api/v1/auth/', auth);
app.use('/api/v1/bookmarks/', bookmarks);

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
