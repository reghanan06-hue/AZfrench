import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization; 

  if (!authHeader) {
    return res.status(401).json({
      message: "Token manquant ou utilisateur non autorisé",
    });
  }

  try {
    // Format attendu "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, nameUser, role }
    next();
  } catch (error) {
    console.error("Erreur token :", error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default auth;
