import express from "express"
import {
    createLesson,
    getAllLesson,
    getLessonById,
} from "../controllers/LessonController.js";

const router =express.Router();
router.post("/", createLesson);        
router.get("/", getAllLesson); 
router.get("/", getLessonById); 

export default router;