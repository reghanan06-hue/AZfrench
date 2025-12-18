import sequelize from "../config/database.js";
import Cours from "../models/Cours.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    const cours = [
      {
        user_id: 1,
        title:"Aplhabet français",
        description :"l'apprentisage d 'alphabet français",
        date_concert: "2025-12-12",

      },
      {
        user_id:2,
        title:"Les nombres",
        description :"l'apprentisage d 'alphabet français",
        date_concert: "2025-12-12",

      },
     
       {
        user_id:2,
        title:"Les nombres",
        description :"l'apprentisage des nombres",
        date_concert: "2025-12-12",

      },
        
       {
        user_id:3,
        title:"Les couleurs",
        description :"l'apprentisage d 'alphabet français",
        date_concert: "2025-12-12",

      },
         {
        user_id:4,
        title:"Les couleurs",
        description :"l'apprentisage d 'alphabet français",
        date_concert: "2025-12-12",

      },
            {
        user_id:4,
        title:"Les animeaux",
        description :"l'apprentisage du nom de chaque animal",
        date_concert: "2025-12-12",

      },
               {
        user_id:5,
        title:"Le corps humain",
        description :"l'apprentisage du parite  d corps humain",
        date_concert: "2025-12-12",

      },

               {
        user_id:6,
        title:"Les parties du maison",
        description :"l'apprentisage du parite  du maison",
        date_concert: "2025-12-12",

      },
                 {
        user_id:7,
        title:"Les nom du metiers",
        description :"l'apprentisage du nom du metiers",
        date_concert: "2025-12-12",

      },
    ];

    await Cours.bulkCreate(cours);
    console.log("Cours seeded successfully!");

    process.exit(0);

  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
