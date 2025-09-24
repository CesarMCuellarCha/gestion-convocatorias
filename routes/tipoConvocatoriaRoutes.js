import { Router } from 'express'
import * as tipoConvocatorias from '../controllers/tipoConvocatoriaController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

// Rutas protegidas por el middleware de autenticación
router.post('/', authMiddleware, tipoConvocatorias.createTipoConvocatoria)
router.get('/', authMiddleware, tipoConvocatorias.getAllTiposConvocatoria)
router.get('/:id', authMiddleware, tipoConvocatorias.getTipoConvocatoriaById)
router.put('/:id', authMiddleware, tipoConvocatorias.updateTipoConvocatoria)
router.delete('/:id', authMiddleware, tipoConvocatorias.deleteTipoConvocatoria)

export default router