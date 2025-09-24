import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database.js"

class Usuario extends Model{
    static associate(models) {
        this.hasOne(models.Funcionario, { foreignKey: 'funUsuarioId', as: 'funcionario' })
        this.hasOne(models.Aprendiz, { foreignKey: 'aprUsuarioId', as: 'aprendiz' })
  }

}

Usuario.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    identificacion: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull:false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    rol:{
        type: DataTypes.ENUM('Aprendiz','Funcionario','Lider'),
        allowNull:false
    }
},{
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    timestamps:true
})

export default Usuario