const admin = (req,res,next) => {
    const user = req.user

    if(!user.role || user.role !== "admin"){
        return res.status(401).json({message : "Accès refusé : admin seulement"});

    }
   next();
};

export default admin;

