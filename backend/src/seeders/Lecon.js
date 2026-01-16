import sequelize from "../config/database.js";
import Lesson from "../models/Lesson.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
const lesson = [
	// select * from cours====frruit==id_ours_17id_lesson=100
  // {
  //   cours_id: 17,
  //   name_lesson: "Banane",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Pomme",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Orange",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1767971418/orange_m1m32o.jpg",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Kiwi",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1585059895524-72359e06133a",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Fraise",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Grappe",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Mangue",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1605027990121-cbae9d3e0d3f",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Ananas",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba",
  // },

  // fruits ajoutés
  // {
  //   cours_id: 17,
  //   name_lesson: "Abricot",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Avocat",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Cerise",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Citron",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0a",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Datte",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1603048297172-c92544798d3c",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Figue",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Grenade",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1570197788417-0e82375c9371",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Litchi",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1625242662167-2c1cbe5d7e7a",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Papaye",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1580910051074-7c6f5f5c1b09",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Pastèque",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Poire",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1580910051074-7c6f5f5c1b09",
  // },
  // {
  //   cours_id: 17,
  //   name_lesson: "Prune",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
  // },

  // metiers
  
  // {  id:300,
  //   cours_id: 18,
  //   name_lesson: "Médecin",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768476922/doctor_ucsvra.jpg",
  // },
  // { id:301,
  //   cours_id: 18,
  //   name_lesson: "Infirmier",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768477427/nurse_h84xlc.avif",
  // },
  // { id:302,
  //   cours_id: 18,
  //   name_lesson: "Enseignant",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768477550/teacher_ndsnet.jpg",
  // },
  // { id:303,
  //   cours_id: 18,
  //   name_lesson: "Développeur",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768477863/developper_ao8wyt.png",
  // },
  // { id:305,
  //   cours_id: 18,
  //   name_lesson: "Avocat",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768478042/A_avocad_gvvf7c.jpg",
  // },
  // { id:306,
  //   cours_id: 18,
  //   name_lesson: "Boulanger",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768478181/boulangerie_nw7u3l.webp",
  // },
  // { id:307,
  //   cours_id: 18,
  //   name_lesson: "Cuisinier",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://images.unsplash.com/photo-1605027990121-cbae9d3e0d3f",
  // },
  // { id:308,
  //   cours_id: 18,
  //   name_lesson: "Chauffeur",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768483164/Gemini_Generated_Image_r5e4hfr5e4hfr5e4_fdxgpe.png",
  // },
  // { id:309,
  //   cours_id: 18,
  //   name_lesson: "Agriculteur",
  //   date_lecon: "2025-12-12",
  //   photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768483466/Gemini_Generated_Image_46xeay46xeay46xe_htqsq4.png",
  // },

  //  corps humain

  
  {
    id: 400,
    cours_id: 16,
    name_lesson: "La tête",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768476922/doctor_ucsvra.jpg",
  },
  {
    id: 401,
    cours_id: 16,
    name_lesson: "Les yeux",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768477427/nurse_h84xlc.avif",
  },
  {
    id: 402,
    cours_id: 16,
    name_lesson: "Les oreilles",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768477550/teacher_ndsnet.jpg",
  },
  {
    id: 403,
    cours_id: 16,
    name_lesson: "Le nez",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768477863/developper_ao8wyt.png",
  },
  {
    id: 405,
    cours_id: 16,
    name_lesson: "La bouche",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768478042/A_avocad_gvvf7c.jpg",
  },
  {
    id: 406,
    cours_id: 16,
    name_lesson: "La main",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768478181/boulangerie_nw7u3l.webp",
  },
  {
    id: 307,
    cours_id: 16,
    name_lesson: "Le bras",
    date_lecon: "2025-12-12",
    photo_url: "https://images.unsplash.com/photo-1605027990121-cbae9d3e0d3f",
  },
  {
    id: 308,
    cours_id: 16,
    name_lesson: "La jambe",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768483164/Gemini_Generated_Image_r5e4hfr5e4hfr5e4_fdxgpe.png",
  },
  {
    id: 309,
    cours_id: 16,
    name_lesson: "Le pied",
    date_lecon: "2025-12-12",
    photo_url: "https://res.cloudinary.com/ddczmc3bb/image/upload/v1768483466/Gemini_Generated_Image_46xeay46xeay46xe_htqsq4.png",
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
