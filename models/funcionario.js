import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

class Funcionario extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'funUsuarioId', as: 'usuario' })
    this.hasMany(models.ResultadoPostulacion, { foreignKey: 'resFuncionarioId', as: 'resultadosGenerados' })
  }
}

Funcionario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  funCargo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Funcionario',
  tableName: 'Funcionarios',
  timestamps: true,
});

export default Funcionario