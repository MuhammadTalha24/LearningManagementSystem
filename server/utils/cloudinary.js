import { v2 as cloudinary } from 'cloudinary'
import env from "dotenv";
env.config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET,
    api_key: process.env.API_KEY
})


export const mediaUpload = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        })
        return uploadResponse;
    } catch (error) {
        console.log(error)
    }
}

export const deleteMediaFromCloudinary = async (publidId) => {
    try {
        await cloudinary.uploader.destroy(publidId)
    } catch (error) {
        console.log(error)
    }
}


export const deleteVideoFromCloudinary = async (publidId) => {
    try {
        await cloudinary.uploader.destroy(publidId, { resource_type: "video" })
    } catch (error) {
        console.log(error)
    }
}