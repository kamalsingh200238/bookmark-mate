import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
// routes
import mainRoutes from '../routes/main.js'  //error here

config();

const app = express();
const port = process.env.PORT ?? 3333; // if port not present in .env file then run on 3333
const db = process.env.DB_STRING as string  //set db to the DB_STRING from the env file

// connect database
mongoose.connect(db)
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server which is typescript Now. ');
});


app.use("/", mainRoutes);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
