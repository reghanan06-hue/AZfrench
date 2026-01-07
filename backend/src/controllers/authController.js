import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";
import { registerSchema } from "../validation/authValidation.js";
dotenv.config();

/* ===================== REGISTER ===================== */
export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {nameUser, email, password, Genre } = req.body;

    if ( !nameUser || !email || !password || !Genre) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires.",
      });
    }

    // vérifier email
    const existsEmail = await User.findOne({ where: { email } });
    if (existsEmail) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // vérifier username
    const existsUsername = await User.findOne({ where: { nameUser } });
    if (existsUsername) {
      return res.status(400).json({
        message: "Nom d'utilisateur déjà utilisé.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      nameUser,
      email,
      password: hashedPassword,
      Genre,
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        nameUser: user.nameUser,
        email: user.email,
        password:user.password,
        Genre: user.Genre,
      },
    });
  } catch (err) {
    console.error("Erreur register :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ===================== LOGIN ===================== */
export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { nameUser, password } = req.body;

    const user = await User.findOne({ where: { nameUser } });
    if (!user) {
      return res.status(400).json({
        message: "Nom d'utilisateur incorrect.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Mot de passe incorrect.",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        nameUser: user.nameUser,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Erreur login :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
