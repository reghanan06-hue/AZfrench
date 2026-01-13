import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Lecon from "./Lesson.js";

// const Lecon = require('./Lecon');

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
    date_exercice: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    niveau: {
      type: DataTypes.ENUM("niveau1", "niveau2", "niveau3"),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("lecture", "ecriture", "écoute"),
      allowNull: false,
    },
  },
  {
    tableName: "exercices",
  }
);

// Relation : Une Leçon peut avoir plusieurs Exercices
Lecon.hasMany(Exercice, { foreignKey: "id_lesson" });
Exercice.belongsTo(Lecon, { foreignKey: "id_lesson" });

export default Exercice;
