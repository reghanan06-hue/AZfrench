import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Cours from "./Cours.js";  // importer le model Cours

const Lesson = sequelize.define(
  "Lesson",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cours_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cours", 
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name_lesson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_lecon: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "lecon", 
    timestamps: false, // createdAt + updatedAt
  }
);

// Associations
Cours.hasMany(Lesson, { foreignKey: "cours_id", onDelete: "CASCADE" });
Lesson.belongsTo(Cours, { foreignKey: "cours_id", onDelete: "CASCADE" });

export default Lesson;
