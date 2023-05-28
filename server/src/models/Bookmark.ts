import { ObjectId, Schema, model } from 'mongoose';

export interface BookmarkDocument extends Document {
  user: ObjectId;
  nameOfBookmark: string;
  urlOfBookmark: string;
}

// Bookmark Schema with nameofBookMark, urlOfBookMark
const BookmarkSchema = new Schema<BookmarkDocument>(
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

    // id of the user who created the bookmark
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Bookmark = model<BookmarkDocument>('Bookmark', BookmarkSchema);
export default Bookmark;
