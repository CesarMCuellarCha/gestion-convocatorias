import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

class Aprendiz extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'aprUsuarioId', as: 'usuario' })
    this.hasMany(models.Postulacion, { foreignKey: 'posAprendizId', as: 'postulaciones' })
  
  }
}

Aprendiz.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  aprFicha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aprPrograma: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Aprendiz',
  tableName: 'Aprendices',
  timestamps: true,
});

export default Aprendiz