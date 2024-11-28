import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse, createLecture, editCourse, getCourseById, getCreatorCourses } from '../controllers/course.controller.js';
import upload from '../utils/multer.js'
const router = express.Router()


router.route('/').post(isAuthenticated, createCourse)
router.route('/').get(isAuthenticated, getCreatorCourses);
router.route('/:id').put(isAuthenticated, upload.single('courseThumbnail'), editCourse);
router.route('/:id').get(isAuthenticated, getCourseById);
router.route('/:id/lecture').post(isAuthenticated, createLecture)

export default router;