
import express from "express"
import {
    createCourse,
    getAllCours,
} from "../controllers/CoursController.js";

const router =express.Router();
router.post("/", createCourse);        
router.get("/", getAllCours); 
export default router;