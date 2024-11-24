import express from 'express'
import { userRegister, loginUser, getUserProfile, logoutUser, updateProfile } from '../controllers/user.controllers.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../utils/multer.js';

const router = express.Router()


router.route('/register').post(userRegister);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/profile/update').put(isAuthenticated, upload.single('profilePhoto'), updateProfile);


export default router;