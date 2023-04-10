const mongoose = require("mongoose");

// A user schema with a username,email and password
const UserSchema = new mongoose.Schema(
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

module.exports = mongoose.model("User", UserSchema);
