import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Cours from "./Cours.js";

const Exercice = sequelize.define(
  "Exercice",
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
        model: Cours,
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
    timestamps: true, 
  }
);


Cours.hasMany(Exercice, { foreignKey: "cours_id" });

Exercice.belongsTo(Cours, { foreignKey: "cours_id" });

export default Exercice;
