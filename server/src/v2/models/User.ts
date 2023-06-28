import * as mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  generateJWT: () => string;
}

// A user schema with a username,email and password
const UserSchema = new mongoose.Schema<UserDocument>(
  {
    // username is a string,with a minimum of 4 characters,all usernames should be unique,and its required of all users
    username: {
      type: String,
      min: 4,
      required: true,
      unique: false,
    },

    // email is a string,with a minimum of 4 characters and is reqired for all users
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // password is a string,with a minimum of 8 characters and is required for all users
    password: {
      type: String,
      min: 8,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateJWT = function () {
  // return a jwt token
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET as string,
    {} // TODO: add options later
  );
};

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;
