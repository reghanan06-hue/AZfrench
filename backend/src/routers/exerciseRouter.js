
import express from "express"
import {
    createExercise,
    getAllExercises,
    getExeciseById
} from "../controllers/ExerciceController.js";

const router =express.Router();
router.post("/", createExercise);        
router.get("/", getAllExercises); 
router.get("/:id", getExeciseById); 
export default router;