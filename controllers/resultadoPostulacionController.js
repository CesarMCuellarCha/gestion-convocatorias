import ResultadoPostulacion from '../models/resultadoPostulacion.js'
import Postulacion from '../models/postulacion.js'
import Usuario from '../models/usuario.js'
import Aprendiz from '../models/aprendiz.js'
import Funcionario from '../models/funcionario.js'

// Controlador para crear o actualizar un resultado de postulación (para Funcionarios/Líderes)
export const createResultado = async (req, res) => {
  const { resPostulacionId, resValoracion, resResultado } = req.body
  const usuarioId = req.user.id
  const usuarioRol = req.user.rol


  // Verificación de rol (solo Funcionarios o Líderes pueden calificar)
  if (usuarioRol !== 'Funcionario' && usuarioRol !== 'Líder') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los funcionarios pueden calificar postulaciones.' })
  }

  try {

    // Buscar el ID del funcionario a partir del ID del usuario autenticado
    const funcionario = await Funcionario.findOne({
      where: { funUsuarioId: usuarioId }
    })

    if (!funcionario) {
      return res.status(404).json({ message: 'Información de funcionario no encontrada.' })
    }

    const resFuncionarioId = funcionario.id

    const postulacion = await Postulacion.findByPk(resPostulacionId)
    if (!postulacion) {
      return res.status(404).json({ message: 'Postulación no encontrada.' })
    }

   
    // Buscar si ya existe un resultado para esta postulación
    let resultado = await ResultadoPostulacion.findOne({ where: { resPostulacionId } })

    if (resultado) {
      // Si el resultado existe, lo actualizamos, incluyendo el ID del funcionario
      await resultado.update({ resValoracion, resResultado, resFuncionarioId });
      return res.status(200).json({ message: 'Resultado de postulación actualizado exitosamente.', resultado })
    } else {
      // Si el resultado no existe, lo creamos
      resultado = await ResultadoPostulacion.create({ resPostulacionId, resValoracion, resResultado, resFuncionarioId })
      return res.status(201).json({ message: 'Resultado de postulación creado exitosamente.', resultado })
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar el resultado de la postulación.', error: error.message })
  }
}

// Controlador para que un aprendiz consulte su propio resultado de postulación
export const getMyResultado = async (req, res) => {
  const usuarioId = req.user.id
  const usuarioRol = req.user.rol

  if (usuarioRol !== 'Aprendiz') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los aprendices pueden consultar su propio resultado.' })
  }

  try {
    // Buscar el ID del aprendiz a partir del ID de usuario
    const aprendiz = await Aprendiz.findOne({ where: { aprUsuarioId: usuarioId } })
    if (!aprendiz) {
      return res.status(404).json({ message: 'Información de aprendiz no encontrada.' })
    }

    // Buscar la postulación del aprendiz y su resultado asociado
    const postulacion = await Postulacion.findOne({
      where: { posAprendizId: aprendiz.id },
      include: [
        { model: ResultadoPostulacion, as: 'resultado' },
        { model: Aprendiz, as: 'aprendiz', include: [{ model: Usuario, as: 'usuario' }] },
        { model: Convocatoria, as: 'convocatoria' }
      ]
    })

    if (!postulacion || !postulacion.resultado) {
      return res.status(404).json({ message: 'Aún no hay un resultado disponible para tu postulación.' })
    }

    res.status(200).json(postulacion.resultado)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el resultado de la postulación.', error: error.message })
  }
}