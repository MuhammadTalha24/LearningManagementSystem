import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student'
    },
    profile_image: {
        type: String,
        default: ''
    },
    enrolled_courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
}, { timestamps: true })


export const User = mongoose.model('User', userSchema)


