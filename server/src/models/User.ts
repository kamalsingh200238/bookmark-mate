import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

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

// function that will automatically hash the passwords and then save them in the database
UserSchema.pre('save', async function() {
  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash the password and then save it
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model<IUser>('User', UserSchema);
export default User;
