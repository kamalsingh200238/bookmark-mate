import { Schema, model } from "mongoose";

export interface IBookmark {
  nameOfBookmark: String;
  urlOfBookmark: String;
}

// Bookmark Schema with nameofBookMark, urlOfBookMark
const BookmarkSchema = new Schema<IBookmark>(
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

const Bookmark = model("Bookmark", BookmarkSchema);
export default Bookmark;
