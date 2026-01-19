import Cours from "../models/Cours.js";
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";

export const createCourse = async (req, res) => {
  try {
    const {title, description, date_creation,photo_url } = req.body;
  const user_id = req.user.id;
    const cours = await Cours.create({
      user_id,
      title,
      description,
      date_creation,
      photo_url
    });
  
    res.status(201).json({
      message: "Course created successfully",
      cours,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllCours = async (req, res) => {
  try {
    const cours = await Cours.findAll();
    res.json(cours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoursById = async (req, res) => {
  try {
    const { id } = req.params;

    const cours = await Cours.findByPk(id, {
      include: {
        model: Lesson,
      },
    });

    if (!cours) {
      return res.status(404).json({ message: "Cours not found" });
    }

    res.status(200).json(cours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update cours
export const updateCours =async(req,res) =>{

  try{
    const {id} =req.params;
    // SELECT id, user_id, title, description, date_creation, "createdAt", "updatedAt", photo_url

    const {title,description,photo_url} =req.body;
     const cours = await Cours.findByPk(id);
    if (!cours) {
      return res.status(404).json({ error: "Cours non trouvé" });
    }

    // Mettre à jour les champs
    cours.title = title || cours.title;
    cours.description = description || cours.description;
    cours.photo_url = photo_url || cours.photo_url;

    await cours.save();

    return res.status(200).json({ message: "Cours mis à jour avec succès", cours });
  } catch (error) {
    console.error("Erreur updateCours:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
  
}
// delete
export const deleteCours = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la tâche existe
    const cours = await Cours.findByPk(id);
    if (!cours) {
      return res.status(404).json({ error: "Cours non trouvée" });
    }

    // Supprimer cours
    await cours.destroy();

    return res.status(200).json({ message: "Cours supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteCours:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};