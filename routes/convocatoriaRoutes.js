import { Router } from "express"
import { createConvocatoria, getAllConvocatorias, 
    getConvocatoriaById, updateConvocatoria, 
    deleteConvocatoria} from "../controllers/convocatoriaController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import upload from "../middlewares/upload.js"

const router = Router()

router.post('/', authMiddleware, upload.single('conDocumento'), createConvocatoria )
router.get('/', authMiddleware, getAllConvocatorias)
router.get('/:id', authMiddleware, getConvocatoriaById)
router.put('/:id', authMiddleware, updateConvocatoria)
router.delete('/:id', authMiddleware, deleteConvocatoria)

export default router