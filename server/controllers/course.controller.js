import { Course } from "../schema/course.model.js";

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