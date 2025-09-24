import Convocatoria from '../models/convocatoria.js'
import TipoConvocatoria from '../models/tipoConvocatoria.js'

export const createConvocatoria = async(req,res)=>{
    try{
        const {conNombre, conCantidadBeneficiarios, conFechaInicial, conFechaFinal, conTipoId} = req.body
        const conDocumento = req.file ? req.file.path : null

        const nuevaConvocatoria = await Convocatoria.create({
            conNombre, conCantidadBeneficiarios, 
            conFechaInicial, conFechaFinal,
            conDocumento, conTipoId
        })

        res.status(201).json(nuevaConvocatoria)
    }catch(error){
        res.status(500).json({message: "Error al crear la convocatoria", error: error.message})
    }
}

export const getAllConvocatorias = async(req,res)=>{
    try{
        const convocatorias = await Convocatoria.findAll({
            include: [{model: TipoConvocatoria, as: 'tipo'}]
        })
        
        return res.status(200).json(convocatorias)

    }catch(error){
        return res.status(500).json({message: "Error al obtener las convocatotorias", error: error.message})

    }

}

export const getConvocatoriaById = async (req,res)=>{
    try{
        const {id} = req.params
        const convocatoria = await Convocatoria.findByPk(id,{
            include: [{model: TipoConvocatoria, as: 'tipo'}]
        })

        if(!convocatoria){
            return res.status(404).json({message: "Convocatoria no encontrada"})
        }

        res.status(200).json(convocatoria)

    }catch(error){
         return res.status(500).json({message: "Error al obtener la convocatoria por su id", error: error.message})
    }
}

export const updateConvocatoria = async(req,res)=>{
    try{
        const {id} = req.params
        const {conNombre, conCantidadBeneficiarios, conFechaInicial, conFechaFinal, conTipoId} = req.body

        const convocatoria = await Convocatoria.findByPk(id)
        if(!convocatoria) {
            return res.status(400).json({message: "Convocatoria no encontrada"})
        }

        await convocatoria.update({ conNombre,conCantidadBeneficiarios, 
            conFechaInicial, conFechaFinal, conTipoId } )

        return res.status(200).json({message: "Convocatoria Actualizada", convocatoria})

    }catch(error){
         return res.status(500).json({message: "Error al actualizar la convocatoria", error: error.message})
    }
}

export const deleteConvocatoria = async(req,res)=>{
    try{
        const {id} = req.params
        
        const convocatoria = await Convocatoria.findByPk(id)
         if(!convocatoria) {
            return res.status(400).json({message: "Convocatoria no encontrada"})
        }

        await convocatoria.destroy()
        return res.status(200).json({message: "Convocatoria eliminada"})

    }catch(error){
         return res.status(500).json({message: "Error al intentart eliminar la convocatoria", 
            error: error.message})
    }
}