import { generate } from "generate-password"

const passwordGenerado = generate({
    length: 8,
    numbers:true,
    symbols: true,
    uppercase: false,
    excludeSimilarCharacters:true,
    strict:true
})

export default passwordGenerado