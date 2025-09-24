import { Router } from 'express';
import { createResultado, getMyResultado } from '../controllers/resultadoPostulacionController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

// Ruta para crear o actualizar un resultado de postulación (solo para Funcionarios/Líderes)
router.post('/', authMiddleware, createResultado)

// Ruta para que un aprendiz consulte el resultado de su postulación
router.get('/mi-resultado', authMiddleware, getMyResultado)

export default router