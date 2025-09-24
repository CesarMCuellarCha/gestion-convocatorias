import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import sequelize from './config/database.js'
//import de rutas
import authRoutes from './routes/authRoutes.js'
import convocatoriaRoutes from './routes/convocatoriaRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import postulacionRoutes from './routes/postulacionRoutes.js'
import resultadoPostulacionRoutes from './routes/resultadoPostulacionRoutes.js'
import tipoConvocatoriaRoutes from './routes/tipoConvocatoriaRoutes.js'
import aprendizRoutes from './routes/aprendizRoutes.js'
import funcionarioRoutes from './routes/funcionarioRoutes.js'


// Importar todos los modelos
import Usuario from './models/usuario.js'
import Funcionario from './models/funcionario.js'
import Aprendiz from './models/aprendiz.js'
import TipoConvocatoria from './models/tipoConvocatoria.js'
import Convocatoria from './models/convocatoria.js'
import Postulacion from './models/postulacion.js'
import ResultadoPostulacion from './models/resultadoPostulacion.js'
import Usuario from './models/usuario.js'
import TipoConvocatoria from './models/tipoConvocatoria.js'


// Crear un objeto 'models' para pasar a las funciones de asociación
const models = {
  Usuario, Funcionario,Aprendiz, Convocatoria, TipoConvocatoria, 
  Postulacion, ResultadoPostulacion
}

/**
 * Llamar a la función associate() en cada modelo
 * necesarias para las relaciones
 * */ 
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

//crear el objeto de la aplicación
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())


// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true }).then(() => {
  console.log('Conexión a la base de datos establecida y modelos sincronizados.')
}).catch(err => {
  console.error('Error al conectar con la base de datos:', err)
})

// Servir archivos estáticos
app.use('/uploads', express.static('uploads'))

// Rutas de la API
app.use('/api/auth', authRoutes)
app.use('/api/convocatorias', convocatoriaRoutes)
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/aprendices', aprendizRoutes)
app.use('/api/funcionarios', funcionarioRoutes)
app.use('/api/postulaciones', postulacionRoutes)
app.use('/api/resultados', resultadoPostulacionRoutes)
app.use('/api/tipoconvocatorias', tipoConvocatoriaRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})