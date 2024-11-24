import { User } from "../schema/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, mediaUpload } from "../utils/cloudinary.js";

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exist"
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);


        await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            message: 'Registeration Successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!password || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Exist"
            })
        }

        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: "Password Do Not Match"
            })
        }


        generateToken(res, user, `Welcome Back ${user.name}`)


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}



export const logoutUser = async (req, res) => {
    try {

        return res.status(200).cookie('token', '', { maxAge: 0 }).json({
            message: "Logged Out Successfully",
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}



// User Update Profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                success: false,
            });
        }

        // Extract public ID from old image URL and delete from Cloudinary
        if (user.profile_image) {
            const publicId = user.profile_image.split("/").pop().split(".")[0];
            if (publicId) {
                await deleteMediaFromCloudinary(publicId);
            }
        }

        // Upload new profile photo
        if (!profilePhoto) {
            return res.status(400).json({
                success: false,
                message: "No profile photo provided",
            });
        }

        const cloudResponse = await mediaUpload(profilePhoto.path);
        const photoURL = cloudResponse.secure_url;

        // Update user data
        const updatedData = { name, profile_image: photoURL };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            message: "Profile Updated Successfully",
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
