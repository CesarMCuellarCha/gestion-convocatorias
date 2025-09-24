import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

class ResultadoPostulacion extends Model {
  static associate(models) {
    this.belongsTo(models.Postulacion, { foreignKey: 'resPostulacionId', as: 'postulacion' })
    this.belongsTo(models.Funcionario, { foreignKey: 'resFuncionarioId', as: 'funcionario' })

  }
}

ResultadoPostulacion.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  resValoracion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  resResultado: {
    type: DataTypes.ENUM('Beneficiado', 'No Beneficiado'),
    allowNull: true
  },
  resFechaActualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ResultadoPostulacion',
  tableName: 'ResultadoPostulaciones',
  timestamps: true,
});

export default ResultadoPostulacion