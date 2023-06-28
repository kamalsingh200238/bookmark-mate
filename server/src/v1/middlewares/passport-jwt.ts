import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate('jwt', { session: false }, (err: Error, user: any) => {
    if (err || !user) {
      // Handle authentication failure
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Authentication successful, store the user in the request object
    req.user = user;
    next();
  })(req, res, next);
}
