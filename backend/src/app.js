import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/database.js";
import authRouters from "./routers/authRouter.js";
import  CoursRouters from "./routers/coursRouter.js";
import LessonRouters from "./routers/LessonRouter.js";
import ExerciseRouter  from "./routers/exerciseRouter.js";


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
// swagger (skip in unit tests to avoid loading swagger config / import.meta)
async function setupSwagger() {
  const [{ swaggerSpec }, swaggerUi] = await Promise.all([
    import("./config/swagger.js"),
    import("swagger-ui-express"),
  ]);

  app.use(
    "/api-docs",
    swaggerUi.default.serve,
    swaggerUi.default.setup(swaggerSpec)
  );
}

if (process.env.NODE_ENV !== "test") {
  // fire-and-forget; if swagger fails we still want the API to boot
  setupSwagger().catch(() => {});
}

const PORT = process.env.PORT || 4000;

export default app;

// When running unit tests, we want to import the Express app without
// auto-connecting to the DB or starting a real HTTP listener.
if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  });
}