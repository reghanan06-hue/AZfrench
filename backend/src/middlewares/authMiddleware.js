// import jwt from "jsonwebtoken";

// const auth = (req,res,next) => {
//     const token = req.headers["autorization"];

//     if(!token){
//         return res.status(401).json({message : " Token manquant or Unauthorized"});

//     }
//     try{
//         const decoded = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET);
//         console.log(decoded)
//         req.user = decoded ;
//         next();
//     }catch(error){
//         console.error("Erreurtoken :",error);
//         res.status(401).json({message : "Token invalide"});
//     }
// };




// export default auth;

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization; // ✅ CORRECT

  if (!authHeader) {
    return res.status(401).json({
      message: "Token manquant ou utilisateur non autorisé",
    });
  }

  try {
    // Format attendu : "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, nameUser, role, iat, exp }
    next();
  } catch (error) {
    console.error("Erreur token :", error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default auth;
