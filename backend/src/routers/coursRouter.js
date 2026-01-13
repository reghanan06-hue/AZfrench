import express from "express";
import {
    createCourse,
    getAllCours,
    getCoursById
} from "../controllers/CoursController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cours
 *   description: Gestion des cours
 */

/**
 * @swagger
 * /cours:
 *   get:
 *     summary: Obtenir tous les cours
 *     tags: [Cours]
 *     responses:
 *       200:
 *         description: Liste des cours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   photo_url:
 *                     type: string
 *                   date_creation:
 *                     type: string
 *                     format: date
 */
router.get("/", getAllCours);

/**
 * @swagger
 * /cours/{id}:
 *   get:
 *     summary: Obtenir un cours par son ID
 *     tags: [Cours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Détails du cours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 photo_url:
 *                   type: string
 *                 date_creation:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Cours non trouvé
 */
router.get("/:id", getCoursById);

/**
 * @swagger
 * /cours:
 *   post:
 *     summary: Créer un nouveau cours
 *     tags: [Cours]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - title
 *             properties:
 *               user_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               example:15
 *               description:
 *                 type: string
 *               example: "Ceci est un cours de moyens Transport."
 *               photo_url:
 *                 type: string
 *               example: "https://example.com/course-image.png"
 *               date_creation:
 *                 type: string
 *                 format: date
 *              example: "2024-12-01"
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post("/", createCourse);

export default router;
