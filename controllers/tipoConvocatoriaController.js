import TipoConvocatoria from '../models/tipoConvocatoria.js'

// Crear un nuevo tipo de convocatoria (solo para líderes)
export const createTipoConvocatoria = async (req, res) => {
  const usuarioRol = req.user.rol
  if (usuarioRol !== 'Líder') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los líderes pueden crear tipos de convocatoria.' })
  }

  const { tipNombre } = req.body
  try {
    const nuevoTipo = await TipoConvocatoria.create({ tipNombre })
    res.status(201).json({ message: 'Tipo de convocatoria creado exitosamente.', tipo: nuevoTipo })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear el tipo de convocatoria.', error: error.message })
  }
};

// Obtener todos los tipos de convocatoria
export const getAllTiposConvocatoria = async (req, res) => {
  try {
    const tipos = await TipoConvocatoria.findAll()
    res.status(200).json(tipos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los tipos de convocatoria.', error: error.message })
  }
};

// Obtener un tipo de convocatoria por ID
export const getTipoConvocatoriaById = async (req, res) => {
  const { id } = req.params
  try {
    const tipo = await TipoConvocatoria.findByPk(id)
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de convocatoria no encontrado.' })
    }
    res.status(200).json(tipo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener el tipo de convocatoria.', error: error.message })
  }
};

// Actualizar un tipo de convocatoria (solo para líderes)
export const updateTipoConvocatoria = async (req, res) => {
  const usuarioRol = req.user.rol;
  if (usuarioRol !== 'Líder') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los líderes pueden actualizar tipos de convocatoria.' })
  }

  const { id } = req.params
  const { tipNombre } = req.body
  try {
    const tipo = await TipoConvocatoria.findByPk(id)
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de convocatoria no encontrado.' })
    }
    await tipo.update({ tipNombre })
    res.status(200).json({ message: 'Tipo de convocatoria actualizado exitosamente.', tipo })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar el tipo de convocatoria.', error: error.message })
  }
};

// Eliminar un tipo de convocatoria (solo para líderes)
export const deleteTipoConvocatoria = async (req, res) => {
  const usuarioRol = req.user.rol
  if (usuarioRol !== 'Líder') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los líderes pueden eliminar tipos de convocatoria.' })
  }

  const { id } = req.params
  try {
    const tipo = await TipoConvocatoria.findByPk(id)
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de convocatoria no encontrado.' })
    }
    await tipo.destroy()
    res.status(200).json({ message: 'Tipo de convocatoria eliminado exitosamente.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar el tipo de convocatoria.', error: error.message })
  }
};