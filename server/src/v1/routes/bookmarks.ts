import { Router } from 'express';
import {
  getAllBookmarks,
  addBookmark,
  findBookmark,
  editBookmark,
  deleteBookmark,
} from '../controllers/bookmarks';

const router = Router();

router.route('/').get(getAllBookmarks).post(addBookmark);
router
  .route('/:id')
  .get(findBookmark)
  .patch(editBookmark)
  .delete(deleteBookmark);

export default router;
