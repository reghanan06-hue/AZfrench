import sequelize from "../config/database.js";
import Lesson from "../models/Lesson.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
const lesson = [
	// select * from cours====frruit==id_ours_17id_lesson=100
  {
    cours_id: 17,
    name_lesson: "Banane",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e",
  },
  {
    cours_id: 17,
    name_lesson: "Pomme",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  {
    cours_id: 17,
    name_lesson: "Orange",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1767971418/orange_m1m32o.jpg",
  },
  {
    cours_id: 17,
    name_lesson: "Kiwi",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1585059895524-72359e06133a",
  },
  {
    cours_id: 17,
    name_lesson: "Fraise",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
  },
  {
    cours_id: 17,
    name_lesson: "Grappe",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
  },
  {
    cours_id: 17,
    name_lesson: "Mangue",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1605027990121-cbae9d3e0d3f",
  },
  {
    cours_id: 17,
    name_lesson: "Ananas",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba",
  },

  // fruits ajoutés
  {
    cours_id: 17,
    name_lesson: "Abricot",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
  },
  {
    cours_id: 17,
    name_lesson: "Avocat",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919",
  },
  {
    cours_id: 17,
    name_lesson: "Cerise",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919",
  },
  {
    cours_id: 17,
    name_lesson: "Citron",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0a",
  },
  {
    cours_id: 17,
    name_lesson: "Datte",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1603048297172-c92544798d3c",
  },
  {
    cours_id: 17,
    name_lesson: "Figue",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
  },
  {
    cours_id: 17,
    name_lesson: "Grenade",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1570197788417-0e82375c9371",
  },
  {
    cours_id: 17,
    name_lesson: "Litchi",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1625242662167-2c1cbe5d7e7a",
  },
  {
    cours_id: 17,
    name_lesson: "Papaye",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1580910051074-7c6f5f5c1b09",
  },
  {
    cours_id: 17,
    name_lesson: "Pastèque",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  {
    cours_id: 17,
    name_lesson: "Poire",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1580910051074-7c6f5f5c1b09",
  },
  {
    cours_id: 17,
    name_lesson: "Prune",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
  },
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
