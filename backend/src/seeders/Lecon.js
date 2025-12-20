import sequelize from "../config/database.js";
import Lesson from "../models/Lesson.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
const lesson = [
  { cours_id: 1, name_lesson: "A", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "B", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "C", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "D", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "E", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "F", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "G", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "H", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "I", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "J", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "K", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "L", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "M", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "N", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "O", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "P", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "Q", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "R", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "S", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "T", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "U", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "V", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "W", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "X", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "Y", date_lecon: "2025-12-12" },
  { cours_id: 1, name_lesson: "Z", date_lecon: "2025-12-12" }
];

        
 

    await Lesson.bulkCreate(lesson);
    console.log("Lesson seeded successfully!");

    process.exit(0);

  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
