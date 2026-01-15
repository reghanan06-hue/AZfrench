import Cours from "../models/Cours.js";
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";

export const createCourse = async (req, res) => {
  try {
    const { user_id, title, descreption, date_creation } = req.body;

    const cours = await Cours.create({
      user_id,
      title,
      descreption,
      date_creation,
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
