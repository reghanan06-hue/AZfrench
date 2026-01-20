import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameUser
 *               - email
 *               - password
 *             properties:
 *               nameUser:
 *                 type: string
 *                 example: aziz123
 *               email:
 *                 type: string
 *                 example: aziz@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               Genre:
 *                 type: string
 *                 enum: [fille, garçon]
 *                 example: garçon
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: user
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Validation error / Email ou username déjà utilisé
 *       500:
 *         description: Erreur serveur
 */
router.post("/signup", register);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameUser
 *               - password
 *             properties:
 *               nameUser:
 *                 type: string
 *                 example: aziz123
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Connexion réussie avec token JWT
 *       400:
 *         description: Nom d'utilisateur ou mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */
router.post("/signin", login);

export default router;
