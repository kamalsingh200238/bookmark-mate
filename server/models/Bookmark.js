const mongoose = require("mongoose");

// A user schema with a username,email and password
const BookmarkSchema = new mongoose.Schema(
  {
    // nameofBookMark is a string and its required
    nameOfBookmark: {
      type: String,
      required: true,
    },
    // urlOfBookMark is a string and is reqired

    urlOfBookmark: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
