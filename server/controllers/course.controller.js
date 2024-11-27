import { Course } from "../schema/course.model.js";
import { deleteMediaFromCloudinary, mediaUpload } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                success: false,
                message: "Course Name And Category is Required"
            })
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        })


        return res.status(200).json({
            success: true,
            message: "Course Created",
            course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId })
        if (!courses) {
            return res.status(400).json({
                courses: [],
                message: "Courses Not Found"
            })
        }

        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.id
        const { courseTitle, subTitle, category, courseLevel, coursePrice, description } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not Found"
            })
        }

        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split('/').pop().split('.')[0];
                await deleteMediaFromCloudinary(publicId);

                courseThumbnail = await mediaUpload(thumbnail.path)
            }
        }

        const updatedData = {
            courseTitle, subTitle, category, courseLevel, coursePrice, description, courseThumbnail: courseThumbnail?.secure_url
        }


        course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true })

        return res.status(200).json({
            success: true,
            'message': "Course Updated Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}