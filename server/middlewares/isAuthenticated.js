import jwt from 'jsonwebtoken'


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "User Not Authenticated"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_KEY)
        if (!decode) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }


        req.id = decode.userId;
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export default isAuthenticated;