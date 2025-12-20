
import express from "express"
import {
    createCourse,
    getAllCours,
    getCoursById
} from "../controllers/CoursController.js";

const router =express.Router();
router.post("/", createCourse);        
router.get("/", getAllCours); 
router.get("/", getCoursById); 

export default router;