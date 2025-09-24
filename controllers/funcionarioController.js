import Funcionario from '../models/funcionario.js';
import Usuario from '../models/usuario.js';

// Obtener todos los funcionarios (solo para líderes)
export const getAllFuncionarios = async (req, res) => {
  const usuarioRol = req.user.rol;

  if (usuarioRol !== 'Líder') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los líderes pueden ver esta información.' });
  }

  try {
    const funcionarios = await Funcionario.findAll({
      include: [{ model: Usuario, as: 'usuario' }]
    });

    res.status(200).json(funcionarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de funcionarios.', error: error.message });
  }
};