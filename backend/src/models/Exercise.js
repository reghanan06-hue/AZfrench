import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Lecon from "./Lesson.js";

const Exercice = sequelize.define(
  "Exercice",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    lecon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Lecon,
        key: "id",
      },
      onDelete: "CASCADE",
    },

    niveau: {
      type: DataTypes.ENUM("niveau1", "niveau2", "niveau3"),
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("lecture", "écriture"),
      allowNull: false,
    },
  },
  {
    tableName: "exercices",
    timestamps: true, // optionnel mais recommandé
  }
);

/* ================= RELATIONS ================= */

// ✅ Une leçon → plusieurs exercices
Lecon.hasMany(Exercice, { foreignKey: "lecon_id" });

// ✅ Un exercice → une leçon
Exercice.belongsTo(Lecon, { foreignKey: "lecon_id" });

export default Exercice;
