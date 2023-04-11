
import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';
import User from '../models/User';
const GoogleStrategy = passportGoogle.Strategy;

//register application through Google Developer console
passport.use(new GoogleStrategy({
    clientID: '<insert GOOGLE_CLIENT_ID',
    clientSecret: '<insert GOOGLE_CLIENT_SECRET>',
    callbackURL: '<insert callback URL>'
  },
  async (accessToken:any, refreshToken:any, profile:any, cb:any) => {
    //get profile details
    //save profile details in db
    const user = await User.findOne( {googleId: profile.id});

    //if user doesn't exist, create new user
    if (!user) {
      const newUser= await User.create( {
        googleId: profile.id,
        name: profile.displayName,
      })
      if (newUser) {
        console.log("new user")
      } 
    else {
        console.log("user")
      }
    }
  }
));

//serialize method determines which data of user object should be stored in session
//recieve user data from passport callback function
passport.serializeUser((user:any,done) => {
  //store in cookie when done function is called
  //save user id in session for further authentication
  done(null,user.id)
})

//later retrieve whole object in deserializeUser function
//deserialize method reads cookie, gets stored user id
passport.deserializeUser(async (id,done) => {
  //use id to find user in db
  const user = await User.findById(id)
  //call done function 
  //this will attach fetched object/user data to request object as req.user
  done(null,user)
})