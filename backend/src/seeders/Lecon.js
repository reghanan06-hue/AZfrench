import sequelize from "../config/database.js";
import Lesson from "../models/Lesson.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const lesson = [
      {
        cours_id: 1,
        name_lesson:"A",
        date_lecon: "2025-12-12",

      },
       {
        cours_id: 2,
        name_lesson:"B",
        date_lecon: "2025-12-12",

      },
     
        {
        cours_id: 3,
        name_lesson:"C",
        date_lecon: "2025-12-12",

      },
         {
        cours_id: 4,
        name_lesson:"D",
        date_lecon: "2025-12-12",

      },
          {
        cours_id: 4,
        name_lesson:"E",
        date_concert: "2025-12-12",

      },
         {
        cours_id: 5,
        name_lesson:"F",
        date_lecon: "2025-12-12",

      },

      {
        cours_id: 6,
        name_lesson:"G",
        date_lecon: "2025-12-12",

      },
        
      {
        cours_id: 7,
        name_lesson:"H",
        date_concert: "2025-12-12",

      },
      {
        cours_id: 8,
        name_lesson:"F",
        date_concert: "2025-12-12",

      },
       {
        cours_id: 9,
        name_lesson:"F",
        date_concert: "2025-12-12",

      },
         {
        cours_id: 10,
        name_lesson:"F",
        date_concert: "2025-12-12",

      },
          
        
    ];

    await Lesson.bulkCreate(lesson);
    console.log("Cours seeded successfully!");

    process.exit(0);

  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
