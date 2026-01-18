import Lesson from "../models/Lesson.js";
import Exercise from "../models/Exercise.js";

export const createExercise = async (req, res) => {
  try {
    const { lecon_id, niveau, type } = req.body;

    if (!lecon_id  || !niveau || !type) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exercise = await Exercise.create({
      lecon_id,
      niveau,
      type,
    });

    res.status(201).json({
      message: "Exercise created successfully",
      exercise,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET ALL ================= */
export const getAllExercises = async (req, res) => {
  try {
    const exercise = await Exercise.findAll();
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExeciseById = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Exercise.findByPk(id, {
      include: {
        model: Lesson,
      },
    });

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json(cours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
