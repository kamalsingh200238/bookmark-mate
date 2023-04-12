import { Router } from 'express';
import { singleTest, addBookmark } from '../controllers/bookmarks';

const router = Router();

router.route('/').get(singleTest);

export default router;
