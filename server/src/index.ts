import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT ?? 3333; // if port not present in .env file then run on 3333

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server which is not typescript yet😛');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
