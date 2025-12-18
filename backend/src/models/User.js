
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const User = sequelize.define('User', {
      id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true 
  },
    nameUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Genre: {
        type: DataTypes.ENUM('girl', 'boy'),
        allowNull: true
    }
}, 
{
  tableName: "users",
  timestamps: true,           // createdAt + updatedAt automatiques
  createdAt: "created_at",
  updatedAt: "updated_at"
}
);

export default User;
