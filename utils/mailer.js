import { createTransport } from "nodemailer"
import 'dotenv/config'

const transporter = createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const enviarCorreo = async(to,subject,html)=>{
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    })
}

export default enviarCorreo