import { Router } from 'express';
import { register,login,profile,logout } from '../controllers/auth';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(profile);
router.route('/logout').post(logout);



export default router;