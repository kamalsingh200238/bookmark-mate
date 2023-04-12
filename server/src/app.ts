import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// routes
// import mainRoutes from '../routes/main.js'  //error here

dotenv.config(); // setting up dotenv to use .env varaible

const app = express();
const port = process.env.PORT ?? 3333; // if port not present in .env file then run on 3333

/* ==============================================
========== Database Setup
================================================*/

const db = process.env.DB_STRING as string  //set db to the DB_STRING from the env file

// connect to database
mongoose.connect(db)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log("There was an error connecting to MongoDB",error));

/* ==============================================
========== Database Setup End
================================================*/

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server which is typescript Now. ');
});


// app.use("/", mainRoutes);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
