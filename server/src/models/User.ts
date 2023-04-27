import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
}

// A user schema with a username,email and password
const UserSchema = new Schema<IUser>(
  {
    // username is a string,with a minimum of 4 characters,all usernames should be unique,and its required of all users
    username: {
      type: String,
      min: 4,
      unique: true,
      required: true,
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

const User = model<IUser>('User', UserSchema);
export default User;
