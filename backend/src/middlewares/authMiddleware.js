import jwt from "jsonwebtoken";

const auth = (req,res,next) => {
    const token = req.headers["autorization"];

    if(!token){
        return res.status(401).json({message : " Token manquant or Unauthorized"});

    }
    try{
        const decoded = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded ;
        next();
    }catch(error){
        console.error("Erreurtoken :",error);
        res.status(401).json({message : "Token invalide"});
    }
};


// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const auth = (req, res, next) => {
//   const authHeader = req.headers["authorization"]; // 
//   if (!authHeader) {
//     return res.status(401).json({ message: "Token manquant ou Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1]; // Bearer TOKEN
//   if (!token) {
//     return res.status(401).json({ message: "Token manquant ou Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role, email ... }

//     // // Vérification rôle admin
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Accès refusé : admin seulement" });
//     }

//     next();
//   } catch (error) {
//     console.error("Erreur token :", error);
//     return res.status(401).json({ message: "Token invalide" });
//   }
// };

export default auth;
