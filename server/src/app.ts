import express, { Request } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import authMiddleware from './v1/middlewares/passport-jwt';
import auth from './v1/routes/auth';
import bookmarks from './v1/routes/bookmarks';
import User from './v2/models/User';

dotenv.config(); // setting up dotenv to use .env variable
const app = express();
const port = process.env.PORT ?? 3333; // if port not present in .env file then run on 3333
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // enable cors
app.use(express.json()); // This will parse JSON data in incoming requests
app.use(cookieParser()); // This will parse cookies in incoming requests

// passport Strategy setup
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies.token, // extract jwt from token
      ]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (
      jwtPayload: {
        _id: string;
        username: string;
        email: string;
      },
      done
    ) => {
      try {
        // Find the user based on the JWT payload
        const user = await User.findById(jwtPayload._id);

        if (!user) {
          return done(null, false);
        }

        // If the user is found, pass it to the route handler
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
app.use(passport.initialize());

app.get('/', (_req, res) => {
  res.send('This is the / route');
});

app.get('/protected', authMiddleware, (req, res) => {
  res.send(req.user);
});

// routes
app.use('/api/v1/auth/', auth);
app.use('/api/v1/bookmarks/', authMiddleware, bookmarks); // all routes in the bookmark routes requires authentication, so added the auth middleware

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
