import { User } from "../schema/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";

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