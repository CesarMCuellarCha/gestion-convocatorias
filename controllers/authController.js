import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Usuario from '../models/usuario.js'
import Aprendiz from "../models/aprendiz.js"
import Funcionario from "../models/funcionario.js"
import enviarCorreo from "../utils/mailer.js"
import passwordGenerado from "../utils/generarPassword.js"


export const register = async(req, res) =>{
    const {username, nombre, apellido, correo, 
        identificacion,rol, aprFicha, aprPrograma, funCargo} = req.body

    try{
        //1. verificar si existe usuario con el username
        const existingUser = await Usuario.findOne({where: {username}})
        if(existingUser){
            return res.status(409).json({message: "El nombre de Usuario ya está en uso"})
        }

        //2. crear la constraseña
        const password  = passwordGenerado

        //3. encriptar la contraseña
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //4. crear el nuevo usuario
        const newUser = await Usuario.create(
            {   username, 
                password:hashedPassword,identificacion,
                nombre,apellido,correo, rol
            })
        
        //5. Crear el registro específico según el rol
        if (rol === 'Aprendiz') {
            await Aprendiz.create({
                aprUsuarioId: newUser.id,
                aprFicha,  aprPrograma
            })
        } else if (rol === 'Funcionario' || rol === 'Líder') {
            await Funcionario.create({
                funUsuarioId: newUser.id, funCargo
            })
        } else {
            return res.status(400).json({ message: 'Rol de usuario no válido' })
        }

        //6. enviar Correo con las credenciales
        let asunto = "Registro en el Sistema"
        let mensaje= `Cordial saludo <b>${nombre} ${apellido}</b>, le informamos que su registro en el sistema
        ha si exitoso. Nos permitimos enviarle las credenciales de Ingreso. <br> <b>Username:</b> ${username}
        <br><b>Password:</b> ${password}. <br><br>Cordialmente,<br><br>La Administración`
        
        await enviarCorreo(correo, asunto, mensaje)
        res.status(201).json({ message: 'Usuario registrado exitosamente' })

    }catch(error){
        return res.status(500).json({message: 'Error al registrar el usuario', error: error.message})
    }    
}

/**
 * Función para logearse en el sistema
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const login = async (req, res) => {
  const { username, password } = req.body

  try {
    // 1. Buscar al usuario por username
    const user = await Usuario.findOne({ where: { username } })
    if (!user) {
      return res.status(400).json({ message: 'Username o contraseña incorrecta' })
    }

    // 2. Validar la contraseña
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' })
    }

    // 3. Generar el token JWT
    const token = jwt.sign({ id: user.id, rol: user.rol }, 
                                process.env.JWT_SECRET, 
                                { expiresIn: '1h' })
    
    //4. dependiendo del tipo de rol se crea un objeto con sus datos
    let tipoUsuario=null
    if (user.rol === 'Aprendiz') {
      const aprendiz = await Aprendiz.findOne({ where: { aprUsuarioId: user.id } })
      tipoUsuario={
          id:  aprendiz.id,
          ficha: aprendiz.aprFicha,
          programa: aprendiz.aprPrograma
        }
    } else if (user.rol === 'Funcionario' || user.rol === 'Líder') {    
      const funcionario = await Funcionario.findOne({ where: {funUsuarioId:user.id} })
      tipoUsuario={
          id:  funcionario.id,
          cargo: funcionario.funCargo,          
      }
    }                    

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        nombre: `${user.nombre} ${user.apellido}`,
        correo : user.correo,
        rol: user.rol,
        tipoUsuarioSesion:tipoUsuario
      }
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el login', error: err.message })
  }
}

