import * as mongoose from 'mongoose';

export interface FolderDocument extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  bookmarks: mongoose.Types.ObjectId[];
}

const FolderSchema = new mongoose.Schema<FolderDocument>(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookmarks: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark', required: true },
    ],
  },
  {
    timestamps: true,
  }
);

export const FolderModel = mongoose.model<FolderDocument>(
  'Folder',
  FolderSchema
);
