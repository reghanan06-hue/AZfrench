import Lesson from "../models/Lesson.js";
import Cours from "../models/Cours.js";

export const createLesson = async (req, res) => {
  try {

    const {id, cours_id, name_lesson, date_lecon, photo_url } = req.body;     

    const lesson = await Lesson.create({
    id, cours_id, name_lesson, date_lecon, photo_url
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
      const lessons = await Lesson.findAll();
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
   
};


export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    return res.status(200).json(lesson);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
