//authentication routes

import express from 'express';
import passport from 'passport'
const router = express.Router();

//render login.ejs
router.get('/login', (req,res) => {
    res.render('login')
})

/*Route Handlers*/ 

//set up route to /auth/google to direct users to Google consent screen
router.get('/google', passport.authenticate('google', { 
    scope: ['email', 'profile']
}));

//set up route for /google/callback
//after login, user is redirected to callback route
router.get('google/callback', passport.authenticate('google'), (req,res) => {
    res.send('This is the callback route')
})

export default router;