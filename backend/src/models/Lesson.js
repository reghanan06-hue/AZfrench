import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Cours from "./Cours.js";

const Lecon = sequelize.define('Lecon', {
      id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true 
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
    name_lesson: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_lecon: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
  tableName: "lecon",
  timestamps: true,           // createdAt + updatedAt automatiques
  createdAt: "created_at",
  updatedAt: "updated_at"
}
);

// Relation : Un Cours peut avoir plusieurs Leçons
Cours.hasMany(Lecon, { foreignKey: 'id_cours' });
Lecon.belongsTo(Cours, { foreignKey: 'id_cours' });

export default Lecon;
