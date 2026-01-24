import express from "express";
import {
  createCourse,
  getAllCours,
  getCoursById,
  updateCours,
  deleteCours,
} from "../controllers/CoursController.js";

// import auth from "../middlewares/authMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";

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

// creer cours par autorisation admin

/**
 * @swagger
 * /cours:
 *   post:
 *     summary: Ajouter un cours (admin uniquement)
 *     description: >
 *       Cette route permet à l’administrateur d’ajouter un nouveau cours.
 *       L’accès est sécurisé par un token JWT.
 *     tags: [Cours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Transport en commun"
 *               description:
 *                 type: string
 *                 example: "Cours éducatif destiné aux enfants"
 *               photo_url:
 *                 type: string
 *                 example: "https://example.com/course-image.png"
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *       401:
 *         description: Non authentifié (token manquant ou invalide)
 *       403:
 *         description: Accès refusé (réservé à l’administrateur)
 */
router.post("/", authMiddleware, isAdmin, createCourse);

/**
 * @swagger
 * /cours/{id}:
 *   put:
 *     summary: Mettre à jour un cours (admin seulement)
 *     tags: [Cours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du cours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               photo_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cours mis à jour avec succès
 *       404:
 *         description: Cours non trouvé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé (non admin)
 */
router.put("/:id", authMiddleware, isAdmin, updateCours);

/**
 * @swagger
 * /cours/{id}:
 *   delete:
 *     summary: Supprimer un cours (admin seulement)
 *     tags: [Cours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Cours supprimé avec succès
 *       404:
 *         description: Cours non trouvé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé (non admin)
 */
router.delete("/:id", authMiddleware, isAdmin, deleteCours);

export default router;
