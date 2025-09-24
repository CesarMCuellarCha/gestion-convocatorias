import { Router } from 'express'
import { getMyProfile, getAllAprendices } from '../controllers/aprendizController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

// Ruta para que un aprendiz consulte su propio perfil
router.get('/perfil', authMiddleware, getMyProfile)

// Ruta para que los líderes puedan ver todos los aprendices
router.get('/', authMiddleware, getAllAprendices)

export default router;