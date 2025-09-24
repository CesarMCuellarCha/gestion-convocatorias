import { Router } from 'express'
import {getMyProfile, getAllUsuarios}  from '../controllers/usuarioController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

// Ruta para que un usuario consulte su propio perfil
router.get('/perfil', authMiddleware, getMyProfile)

// Ruta para que los líderes puedan ver todos los usuarios
router.get('/', authMiddleware, getAllUsuarios)

export default router