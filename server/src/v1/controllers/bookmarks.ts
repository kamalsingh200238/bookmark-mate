import { Response, Request } from 'express';
import Bookmark from '../models/Bookmark';
import Joi from 'joi';
import { UserDocument } from '../models/User';

const bookmarkSchema = Joi.object({
  nameOfBookmark: Joi.string().required(),
  urlOfBookmark: Joi.string().required(),
});

export const getAllBookmarks = async (req: Request, res: Response) => {
  try {
    console.log("req.user",req.user)
    const user = req.user as UserDocument; // get user from request as User Document
    const bookmarks = await Bookmark.find({ user: user }); // get all bookmarks created by the user
    res.json({ bookmarks });
  } catch (error) {
    console.log('There was an error', error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const addBookmark = async (req: Request, res: Response) => {
  const user = req.user as UserDocument; // get the user who made the request
  const { nameOfBookmark, urlOfBookmark } = req.body; // get the data from body
  // Validate the data in request
  const { error } = bookmarkSchema.validate({ nameOfBookmark, urlOfBookmark });
  if (error) {
    // if there are errors
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // create new bookmark
    const bookmark = await Bookmark.create({
      nameOfBookmark,
      urlOfBookmark,
      user: user,
    });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    console.log('There was an error', error);
    res.status(500).json({ message: 'Internal Sever Error', error: error });
  }
};

export const deleteBookmark = async (req: Request, res: Response) => {
  const bookmarkId = req.params.id;
  const user = req.user as UserDocument; // get the user who made the request
  try {
    // Check if the user owns the bookmark they are trying to delete
    const response = await Bookmark.findOneAndDelete({
      _id: bookmarkId,
      user: user,
    });
    if (response) {
      // if bookmark deleted
      return res
        .status(200)
        .json({ message: 'Bookmark deleted', bookmark: response });
    }
    // if there was no bookmark
    res.status(404).json({ message: 'No bookmark found!' });
  } catch (error) {
    console.log('There was an error', error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const editBookmark = async (req: Request, res: Response) => {
  const bookmarkId = req.params.id;
  const user = req.user as UserDocument;
  const { urlOfBookmark, nameOfBookmark } = req.body;
  // Validate the data in request
  const { error } = bookmarkSchema.validate({ urlOfBookmark, nameOfBookmark });
  if (error) {
    // if  error in data
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const updatedBookmark = await Bookmark.findOneAndUpdate(
      {
        _id: bookmarkId,
        user: user,
      },
      { urlOfBookmark, nameOfBookmark },
      { new: true }
    );
    if (updatedBookmark) {
      // if bookmark updated successfully
      return res
        .status(200)
        .json({ message: 'Bookmark updated', bookmark: updatedBookmark });
    }
    // if there was no bookmark
    res.status(404).json({ message: updatedBookmark });
  } catch (error) {
    console.log('There was an error', error);
    res.status(500).json({ message: error });
  }
};

export const findBookmark = async (req: Request, res: Response) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (bookmark) {
      // if bookmark exists
      return res.status(200).json({ message: bookmark });
    }
    // if bookmark not found
    res.status(404).json({ message: 'bookmark not found ' });
  } catch (error) {
    console.log('There was an error', error);
    res.status(500).json({ message: error });
  }
};
