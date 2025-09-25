import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: 'API Gestión Convocatorias Aprendices CTPI',
        description: 'Documentación de la API para la gestión de convocatorias',
    },
    host: 'localhost:3000',
    schemes: ['http'],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./server.js']; // Cambia este archivo según el punto de entrada de tu API

swaggerAutogen(outputFile, endpointsFiles).then(async () => {
    const server = await import('./server.js')
})