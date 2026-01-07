import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Cours = sequelize.define(
  "Cours",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    photo_url: {
      type: DataTypes.STRING,
    },

    date_creation: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "cours",
    timestamps: true, // createdAt + updatedAt automatiques
    // createdAt: "created_at",
    // updatedAt: "updated_at",
  }
);

User.hasMany(Cours, { foreignKey: "user_id" });
Cours.belongsTo(User, { foreignKey: "user_id" });

export default Cours;
