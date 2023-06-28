import * as mongoose from 'mongoose';

export interface BookmarkDocument extends Document {
  name: string;
  url: string;
  description: string;
  userId: mongoose.Types.ObjectId;
  folderId: mongoose.Types.ObjectId;
}

// Bookmark Schema with nameofBookMark, urlOfBookMark
const BookmarkSchema = new mongoose.Schema<BookmarkDocument>(
  {
    // name of BookMark is a string and its required
    name: {
      type: String,
      required: true,
    },

    // url Of BookMark is a string and is reqired
    url: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    // id of the user who created the bookmark
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // id of the folder in which this bookmark is created
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  },
  {
    timestamps: true,
  }
);

const Bookmark = mongoose.model<BookmarkDocument>('Bookmark', BookmarkSchema);
export default Bookmark;
