import Postulacion from '../models/postulacion.js'
import Aprendiz from '../models/aprendiz.js'
import Convocatoria from '../models/convocatoria.js'
import Usuario from '../models/usuario.js'
import enviarCorreo from '../utils/mailer.js'

// Controlador para que un aprendiz cree una postulación
export const createPostulacion = async (req, res) => {
  const { posConvocatoriaId} = req.body
  const usuarioId = req.user.id // Obtenido del token JWT


  try {
    // 1. Obtener el ID del aprendiz a partir del ID del usuario autenticado
    const aprendiz = await Aprendiz.findOne({
      where: { aprUsuarioId: usuarioId }
    })

    // Si no se encuentra el aprendiz, es un rol incorrecto o un error
    if (!aprendiz) {
      return res.status(403).json({ message: 'Acceso denegado. Solo los aprendices pueden postularse.' })
    }

    // Usar el ID del aprendiz para la postulación
    const posAprendizId = aprendiz.id


    // 2. Verificar si el aprendiz ya se ha postulado
    const existingPostulacion = await Postulacion.findOne({
      where: {
        posAprendizId,
        posConvocatoriaId
      }
    })

    if (existingPostulacion) {
      return res.status(409).json({ message: 'Ya te has postulado a esta convocatoria.' })
    }

    // 3. Crear la postulación con el ID del aprendiz
    const nuevaPostulacion = await Postulacion.create({
      posAprendizId,
      posConvocatoriaId
    })

    // 4. Obtener los datos para el correo de confirmación
    const usuario = await Usuario.findByPk(usuarioId)
    const convocatoria = await Convocatoria.findByPk(posConvocatoriaId)

    // 4. Enviar el correo de confirmación
    if (usuario && convocatoria) {
      await enviarCorreo(usuario.correo, "confirmación de Postulación",
        `<p>Nos permitimos confirmar su postulación a la convocatoria <b>${convocatoria.conNombre}</b><br>
        <br>Lo invitamos a estar pendiente de los resultados en próximos días.<br><br>
        Cordialmente, <br><br>Oficina Bienestar Aprendices<br>Centro de Teleinformática
        y Producción Industrial CTPI<br>SENA-CAUCA`
      )
    }
    res.status(201).json({ 
      message: 'Postulación creada exitosamente',
      postulacion: nuevaPostulacion 
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la postulación', error: error.message })
  }
}

// Controlador para que un funcionario obtenga todas las postulaciones
export const getAllPostulaciones = async (req, res) => {
  // En un entorno real, deberías verificar que el rol del usuario sea 'Funcionario' o 'Líder'
   if (req.user.rol !== 'Funcionario' && req.user.rol !== 'Líder') {
    return res.status(403).json({ message: 'Acceso denegado.' })
  }

  try {
    const postulaciones = await Postulacion.findAll({
      include: [
        { model: Aprendiz, as: 'aprendiz' },
        { model: Convocatoria, as: 'convocatoria' }
      ]
    });

    res.status(200).json(postulaciones);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener las postulaciones', error: error.message })
  }
}

