import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/database.js";
import authRouters from "./routers/authRouter.js";
import  CoursRouters from "./routers/coursRouter.js";
import LessonRouters from "./routers/LessonRouter.js";
import ExerciseRouter  from "./routers/exerciseRouter.js";
import { swaggerSpec } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouters);
// app.post('/signup', authRouters)
// app.post('/signin', authRouters)

app.use("/cours", CoursRouters);
app.use("/cours/:id", CoursRouters);

app.use("/lesson",LessonRouters);
app.use("/exercise",ExerciseRouter);
// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;


 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });
});