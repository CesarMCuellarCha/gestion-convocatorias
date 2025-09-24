import { Router } from 'express'
import { getAllFuncionarios } from '../controllers/funcionarioController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router();

// Ruta para que los líderes puedan ver todos los funcionarios
router.get('/', authMiddleware, getAllFuncionarios)

export default router