import { Router } from 'express'
import {createPostulacion, getAllPostulaciones} from '../controllers/postulacionController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

// Ruta para que un aprendiz se postule a una convocatoria.
// Protegida por el middleware de autenticación.
router.post('/', authMiddleware, createPostulacion)

// Ruta para que los funcionarios puedan ver todas las postulaciones.
// Protegida por el middleware de autenticación.
router.get('/', authMiddleware, getAllPostulaciones)

export default router