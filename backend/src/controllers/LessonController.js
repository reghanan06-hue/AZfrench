import Lesson from "../models/Lesson.js";
import Cours from "../models/Cours.js";

export const createLesson = async (req, res) => {
  try {
    const { cours_id, name_lesson, date_lesson } = req.body;

    if (!cours_id || !name_lesson || !date_lesson) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const lesson = await Lesson.create({
      cours_id,
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

/* ================= GET ALL ================= */
export const getAllLesson = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      include: {
        model: Cours,
        as: "cours", // نفس alias فـ association
      },
    });

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByPk(id, {
      include: {
        model: Cours,
        as: "cours",
      },
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
