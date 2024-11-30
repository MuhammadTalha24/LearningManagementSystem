import { Course } from "../schema/course.model.js";
import { Lecture } from '../schema/lecture.model.js'
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, mediaUpload } from "../utils/cloudinary.js";

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
        const id = req.params.id;
        const { courseTitle, subTitle, category, courseLevel, coursePrice, description } = req.body;
        const thumbnail = req.file;

        // Find the course by ID
        let course = await Course.findById(id);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not Found"
            });
        }

        // Handle course thumbnail update
        let courseThumbnail = course.courseThumbnail; // Default to existing thumbnail
        if (thumbnail) {
            try {
                if (course.courseThumbnail) {
                    const publicId = course.courseThumbnail.split('/').pop().split('.')[0];
                    await deleteMediaFromCloudinary(publicId); // Remove old thumbnail
                }
                const uploadResponse = await mediaUpload(thumbnail.path);
                courseThumbnail = uploadResponse.secure_url; // Set new thumbnail URL
            } catch (uploadError) {
                return res.status(500).json({
                    success: false,
                    message: "Error uploading thumbnail."
                });
            }
        }

        // Update course data
        const updatedData = {
            courseTitle,
            subTitle,
            category,
            courseLevel,
            coursePrice,
            description,
            courseThumbnail
        };

        course = await Course.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            course
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const getCourseById = async (req, res) => {
    try {
        const id = req.params.id;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not Found"
            })
        }


        return res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



export const createLecture = async (req, res) => {
    try {
        const { id } = req.params;
        const { lectureTitle } = req.body;


        if (!lectureTitle) {
            return res.status(400).json({
                success: false,
                message: "Lecture title is required",
            });
        }


        const course = await Course.findById(id);


        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const lecture = await Lecture.create({
            lectureTitle,
        });


        course.lectures.push(lecture._id);
        await course.save();

        return res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            lecture,
        });
    } catch (error) {
        console.error("Error creating lecture:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};



export const getLecture = async (req, res) => {
    try {

        const id = req.params.id;
        const course = await Course.findById(id).populate("lectures");

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            lectures: course.lectures
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}


export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;
        const { lectureId } = req.params
        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status(400).json({ message: "Lecture Not Found", success: false })
        }

        if (lectureTitle) lecture.lectureTitle = lectureTitle
        if (videoInfo.videoUrl) lecture.videoUrl = videoInfo.videoUrl
        if (videoInfo.publicId) lecture.publicId = videoInfo.publicId
        if (isPreviewFree) lecture.isPreviewFree = isPreviewFree

        await lecture.save();

        return res.status(200).json({
            success: true,
            lecture,
            message: "Lecture Updated Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if (!lecture) {
            return res.status(400).json({
                success: false,
                message: "Lecture Not Found"
            })
        }


        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId)
        }

        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        )


        return res.status(200).json({
            success: true,
            message: "Lecture Removed Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params
        const lecture = await findById(lectureId)
        if (!lecture) {
            return res.status(400).json({
                success: false,
                message: "Lecture Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            lecture
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}