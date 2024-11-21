import express from 'express'
import { userRegister, loginUser } from '../controllers/user.controllers.js';
const router = express.Router()


router.route('/register').post(userRegister);
router.route('/login').post(loginUser);


export default router;