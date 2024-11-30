import express from 'express'
import upload from '../utils/multer.js'
import { mediaUpload } from '../utils/cloudinary.js'

const router = express.Router()


router.route('/media-upload').post(upload.single("file"), async (req, res) => {
    try {

        const result = await mediaUpload(req.file.path);
        res.status(200).json({
            success: true,
            message: "File Uploaded Successfully",
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
})

export default router