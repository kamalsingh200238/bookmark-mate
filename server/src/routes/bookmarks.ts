import { Router } from 'express';
import {
  singleTest,
  addBookmark,
  findBookmark,
  deleteBookmark,
} from '../controllers/bookmarks';

const router = Router();

router.route('/').get(singleTest);
router.route('/addBookmark').post(addBookmark);
router.route('/:id/').get(findBookmark).delete(deleteBookmark);

export default router;
