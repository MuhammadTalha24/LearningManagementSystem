import express from 'express'
import dbConnection from './database/dbConnection.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import env from 'dotenv';
import courseRoutes from './routes/course.routes.js'
import mediaRoutes from './routes/media.routes.js'
env.config();
const app = express()

//default Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PATCH", "PUT"],
    credentials: true
}));

app.use('/api/media', mediaRoutes)
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

dbConnection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server Running At ${process.env.PORT}`)
    })
})

