import Usuario from '../models/usuario.js'
import Funcionario from '../models/funcionario.js'
import Aprendiz from '../models/aprendiz.js'

// Controlador para obtener el perfil del usuario autenticado
export const getMyProfile = async (req, res) => {
  const usuarioId = req.user.id
  const usuarioRol = req.user.rol

  try {
    const usuario = await Usuario.findByPk(usuarioId, {
      attributes: { exclude: ['password'] } // Excluir el campo de la contraseña por seguridad
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    // Incluir información específica del rol
    if (usuarioRol === 'Aprendiz') {
      const aprendiz = await Aprendiz.findOne({
        where: { aprUsuarioId: usuarioId },
        include: [{ model: Usuario, as: 'usuario', attributes: { exclude: ['password'] } }]
      });
      return res.status(200).json(aprendiz)
    } else if (usuarioRol === 'Funcionario' || usuarioRol === 'Líder') {
      const funcionario = await Funcionario.findOne({
        where: { funUsuarioId: usuarioId },
        include: [{ model: Usuario, as: 'usuario', attributes: { exclude: ['password'] } }]
      });
      return res.status(200).json(funcionario)
    }

    res.status(200).json(usuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener el perfil del usuario.', error: error.message })
  }
};

// Controlador para obtener todos los usuarios (solo para líderes)
export const getAllUsuarios = async (req, res) => {
  const usuarioRol = req.user.rol

  if (usuarioRol !== 'Líder') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los líderes pueden ver la lista completa de usuarios.' })
  }

  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] } // Excluir la contraseña para todos
    })

    res.status(200).json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener la lista de usuarios.', error: error.message })
  }
}