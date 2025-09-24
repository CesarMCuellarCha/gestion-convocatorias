import Aprendiz from '../models/aprendiz.js';
import Usuario from '../models/usuario.js';

// Obtener el perfil del aprendiz autenticado
export const getMyProfile = async (req, res) => {
  const usuarioId = req.user.id;

  try {
    const aprendiz = await Aprendiz.findOne({
      where: { aprUsuarioId: usuarioId },
      include: [{ model: Usuario, as: 'usuario' }]
    });

    if (!aprendiz) {
      return res.status(404).json({ message: 'Información de aprendiz no encontrada.' });
    }

    res.status(200).json(aprendiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el perfil del aprendiz.', error: error.message });
  }
};

// Obtener todos los aprendices (solo para líderes)
export const getAllAprendices = async (req, res) => {
  const usuarioRol = req.user.rol;

  if (usuarioRol !== 'Líder') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los líderes pueden ver esta información.' });
  }

  try {
    const aprendices = await Aprendiz.findAll({
      include: [{ model: Usuario, as: 'usuario' }]
    });

    res.status(200).json(aprendices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de aprendices.', error: error.message });
  }
};