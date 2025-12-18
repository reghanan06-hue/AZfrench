import Lesson from "../models/Lesson.js";
import Cours  from "../models/Cours.js"

export const createLesson= async (req, res) => {
  try {
    const { id_cours, name_lesson, date_lesson } = req.body;

    const lesson = await Lesson.create({
      id_cours,
      name_lesson,
      date_lesson,
    });

    res.status(201).json({
      message: "Lesson created successfully",
      lesson,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllLesson = async (req, res) => {
  try {
    const lecon = await Cours.findAll();
    res.json(lecon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByPk(id,{
      include:us
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
