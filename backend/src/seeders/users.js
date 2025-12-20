import bcrypt from "bcrypt";
import sequelize from "../config/database.js";
import User from "../models/User.js";

async function seedUsers() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync(); // assure que la table existe

    const users = [
      {
        nameUser: "Admin",
        email: "admin@test.com",
        password: await bcrypt.hash("123456", 10),
        Genre: "boy"
      },
      {
        nameUser: "Sara",
        email: "sara@test.com",
        password: await bcrypt.hash("123456", 10),
        Genre: "girl"
      },
      {
        nameUser: "Youssef",
        email: "youssef@test.com",
        password: await bcrypt.hash("123456", 10),
        Genre: "boy"
      },
      {
        nameUser: "Aya",
        email: "aya@test.com",
        password: await bcrypt.hash("123456", 10),
        Genre: "girl"
      },
      {
        nameUser: "Omar",
        email: "omar@test.com",
        password: await bcrypt.hash("123456", 10),
        Genre: "boy"
      },
      {
        nameUser: "Lina",
        email: "lina@test.com",
        password: await bcrypt.hash("123456", 10),
        Genre: "girl"
      },
      {
        nameUser: "Adam",
        email: "adam@test.com",
        password: await bcrypt.hash("123456", 10),
        Genre: "boy"
      }
    ];

    await User.bulkCreate(users, { validate: true });
    console.log("🎉 Users seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
}

seedUsers();
