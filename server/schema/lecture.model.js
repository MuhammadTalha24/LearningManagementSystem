import mongoose from 'mongoose'


const lectureSchema = mongoose.Schema({
    lectureTitle: {
        type: String,
        require: true
    },
    videoUrl: {
        type: String,
    },
    isPreviewFree: {
        type: Boolean
    },
    publicId: { type: String }

}, { timestamps: true })


export const Lecture = mongoose.model("Lecture", lectureSchema);