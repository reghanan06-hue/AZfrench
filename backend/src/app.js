import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/database.js";
import authRouters from "./routers/authRouter.js";
import  CoursRouters from "./routers/coursRouter.js"
import LessonRouters from "./routers/LessonRouter.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouters);
app.use("/course", CoursRouters);
app.use("/lesson",LessonRouters);
const PORT = process.env.PORT || 4000;


 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });
});