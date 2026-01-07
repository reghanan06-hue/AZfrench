import sequelize from "../config/database.js";
import Lesson from "../models/Lesson.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
const lesson = [

  { cours_id: 13, name_lesson: "Rouge", date_lecon: "2025-12-12" },
  { cours_id: 13, name_lesson: "Bleu", date_lecon: "2025-12-12" },
  { cours_id: 13, name_lesson: "Jaune", date_lecon: "2025-12-12" },
  { cours_id: 13, name_lesson: "Vert", date_lecon: "2025-12-12" },
  { cours_id: 13, name_lesson: "Maron", date_lecon: "2025-12-12" },
  { cours_id: 13, name_lesson: "ROSE", date_lecon: "2025-12-12" },
  { cours_id: 13, name_lesson: "Blanc", date_lecon: "2025-12-12" },
  { cours_id: 13, name_lesson: "Grais", date_lecon: "2025-12-12" },

  
  // { cours_id: 14, name_lesson: "Rouge", date_lecon: "2025-12-12" },
  // { cours_id: 14, name_lesson: "Bleu", date_lecon: "2025-12-12" },
  // { cours_id: 14, name_lesson: "Jaune", date_lecon: "2025-12-12" },
  // { cours_id: 14, name_lesson: "Vert", date_lecon: "2025-12-12" },
  // { cours_id: 14, name_lesson: "Maron", date_lecon: "2025-12-12" },
  // { cours_id: 14, name_lesson: "Rose", date_lecon: "2025-12-12" },
  // { cours_id: 14, name_lesson: "Blanc", date_lecon: "2025-12-12" },
  // { cours_id: 14, name_lesson: "Grais", date_lecon: "2025-12-12" },


 
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
