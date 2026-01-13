import express from "express";
import {
    createLesson,
    getAllLesson,
    getLessonById,
} from "../controllers/LessonController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Gestion des leçons
 */

/**
 * @swagger
 * /lesson:
 *   get:
 *     summary: Obtenir toutes les leçons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: Liste de toutes les leçons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   cours_id:
 *                     type: integer
 *                     example: 3
 *                   name_lesson:
 *                     type: string
 *                     example: "Les couleurs"
 *                   date_lecon:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-10"
 *                   photo_url:
 *                     type: string
 *                     example: "https://example.com/colors.png"
 */

router.get("/", getAllLesson);

/**
 * @swagger
 * /lesson/{id}:
 *   get:
 *     summary: Obtenir une leçon par son ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Détails de la leçon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 cours_id:
 *                   type: integer
 *                   example: 3
 *                 name_lesson:
 *                   type: string
 *                   example: "Les animaux"
 *                 date_lecon:
 *                   type: string
 *                   format: date
 *                   example: "2025-01-15"
 *                 photo_url:
 *                   type: string
 *                   example: "https://example.com/animals.png"
 *       404:
 *         description: Leçon non trouvée
 */

router.get("/:id", getLessonById);

/**
 * @swagger
 * /lesson:
 *   post:
 *     summary: Créer une nouvelle leçon 
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cours_id
 *               - name_lesson
 *             properties:
 *                
 *               cours_id:
 *                 type: integer
 *                 example: 15
 *               name_lesson:
 *                 type: string
 *                 example: "Girafe"
 *               date_lecon:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-20"
 *               photo_url:
 *                 type: string
 *                 example: "https://example.com/colors.png"
 *     responses:
 *       201:
 *         description: Leçon créée avec succès
 *       400:
 *         description: Données invalides
 */

router.post("/", createLesson);

export default router;
