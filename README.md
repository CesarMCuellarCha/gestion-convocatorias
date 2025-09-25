# API - Gestión de Convocatorias para Aprendices SENA CTPI

Este proyecto es una API para la **Gestión de Convocatorias** del SENA
CTPI desarrollada en **Node.js** con **MySQL** utilizando el ORM
**Sequelize**.

------------------------------------------------------------------------

## 🚀 Tecnologías y Librerías Utilizadas

-   **Node.js**
-   **Express**
-   **Sequelize**
-   **MySQL2**
-   **Cors**
-   **Dotenv**
-   **Bcryptjs**
-   **Nodemailer**
-   **Multer**
-   **Jsonwebtoken**
-   **Generate-password**

------------------------------------------------------------------------

## 📂 Estructura de Carpetas

    -config/          # Conexión a la base de datos
    -controllers/     # Controladores de la API
    -models/          # Modelos Sequelize para cada tabla
    -middlewares/     # Middlewares de autenticación y subida de archivos
    -routes/          # Definición de rutas por modelo
    -uploads/         # Almacenamiento de archivos de convocatorias
    -utils/           # Funciones para envío de correo y generación de contraseñas
    .env              # Variables de entorno
    server.js         # Punto de entrada principal
    package.json      # Dependencias y scripts del proyecto
    swagger.js        # configuración para documentar la api
    swagger_output.json #generao al ejecutor con node swagger.js

------------------------------------------------------------------------

## ⚙️ Variables de Entorno

Crea un archivo `.env` con el siguiente contenido:

    DB_NAME=nombre_de_la_bd
    DB_USER=usuario_bd
    DB_PASS=contraseña_bd
    DB_HOST=localhost
    JWT_SECRET=tu_jwt_secret
    EMAIL_USER=correo@ejemplo.com
    EMAIL_PASS=contraseña_correo

------------------------------------------------------------------------

## 📦 Instalación

``` bash
# Clonar el repositorio
git clone https://github.com/CesarMCuellarCha/gestion-convocatorias.git

# Entrar en el proyecto
cd gestion-convocatorias

# Instalar dependencias
npm install
```

------------------------------------------------------------------------

## ▶️ Ejecución

``` bash
# Modo desarrollo
npm run dev

# Producción
npm start
```

------------------------------------------------------------------------

## 🛣️ Endpoints Principales

### Autenticación

  Método   Ruta                 Descripción
  -------- -------------------- ----------------------
 - POST     /api/auth/register:    Registro de usuarios
 - POST     /api/auth/login: .      Login en el sistema

### Convocatorias

  Método   Ruta                     Descripción
  -------- ------------------------ ----------------------------------
-  POST     /api/convocatorias:        Crear convocatoria (con archivo)
-  GET      /api/convocatorias:        Listar todas las convocatorias
-  GET      /api/convocatorias/:id:    Obtener convocatoria por ID
-  PUT      /api/convocatorias/:id:    Actualizar convocatoria
-  DELETE   /api/convocatorias/:id:   Eliminar convocatoria

### Tipos de Convocatoria

  Método   Ruta                         Descripción
  -------- ---------------------------- ------------------------------
-  POST     /api/tipoconvocatorias:       Crear tipo de convocatoria
-  GET      /api/tipoconvocatorias:      Listar tipos de convocatoria
-  GET      /api/tipoconvocatorias/:id:   Obtener tipo por ID
-  PUT      /api/tipoconvocatorias/:id:   Actualizar tipo
-  DELETE   /api/tipoconvocatorias/:id:   Eliminar tipo

### Postulaciones

  -----------------------------------------------------------------------------
  Método                Ruta                 Descripción
  --------------------- -------------------- ----------------------------------
-  POST                  /api/postulaciones:  Crear postulación (Aprendices)

-  GET                   /api/postulaciones:   Ver todas las postulaciones
                                             (Funcionarios)
  -----------------------------------------------------------------------------

### Resultados de Postulación

  ---------------------------------------------------------------------------------------
  Método                Ruta                           Descripción
  --------------------- ------------------------------ ----------------------------------
-  POST                  /api/resultados:                Crear/actualizar resultado
                                                       (Funcionarios)

-  GET                   /api/resultados/mi-resultado:   Ver resultado personal
                                                       (Aprendices)
  ---------------------------------------------------------------------------------------

### Usuarios

  Método   Ruta                   Descripción
  -------- ---------------------- ---------------------------
-  GET      /api/usuarios:          Listar usuarios (Líderes)
-  GET      /api/usuarios/perfil:   Ver perfil del usuario

### Funcionarios & Aprendices

  Método   Ruta                Descripción
  -------- ------------------- ---------------------
-  GET      /api/funcionarios:   Listar funcionarios
-  GET      /api/aprendices:     Listar aprendices

### Swagger documentación de la api

  Método   Ruta                Descripción
  -------- ------------------- ---------------------
-  GET      /api-docs:   Documentar la api
------------------------------------------------------------------------


## 🔒 Autenticación

El sistema utiliza **JWT (JSON Web Token)** para proteger las rutas
privadas.

------------------------------------------------------------------------

## 📧 Notificaciones por Correo

Se utiliza **Nodemailer** para el envío de correos electrónicos al
momento de registro y actualización de convocatorias.

------------------------------------------------------------------------

## 🖼️ Subida de Archivos

Se utiliza **Multer** para gestionar la subida de archivos (documentos
de las convocatorias).

------------------------------------------------------------------------

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.

------------------------------------------------------------------------

## 📬 Ejemplos de Peticiones con Postman

### Autenticación

**Registro de Usuario tipo Instructor**

    POST /api/auth/register
    Body (JSON):
    {      
      "username": "cccuellar@gmail.com",
      "correo": "ccuellar@gmail.com",
      "identificacion": "5555",
      "nombre":"César",
      "apellido":"Cuéllar",
      "rol": "Funcionario",
      "funCargo": "Instructor"
    }

**Registro de Usuario tipo Aprendiz**

    POST /api/auth/register
    Body (JSON):
    {      
      "username": "rosa@gmail.com",
      "correo": "rosa@gmail.com",
      "identificacion": "66666",
      "nombre":"Monik",
      "apellido":"Galindo",
      "rol": "Aprendiz",
      "aprficha": "30000",
      "aprPrograma": "ADSO"     
    }

**Login de Usuario**

    POST /api/auth/login
    Body (JSON):
    {
      "username": "juan@example.com",
      "password": "123456"
    }

------------------------------------------------------------------------

### Convocatorias

**Crear Convocatoria (con archivo)**

    POST /api/convocatorias
    Headers:
    Authorization: Bearer <token>

    Body (form-data):
    conDocumento: archivo.pdf
    conNombre: Convocatoria Prueba
    conCantidadBenficiarios: 5
    conFechaInicial: 2025-09-10
    conFechafinal: 2025-09-20
    conTipoId: 2

**Obtener todas las convocatorias**

    GET /api/convocatorias
    Headers:
    Authorization: Bearer <token>

**Obtener convocatoria por ID**

    GET /api/convocatorias/1
    Headers:
    Authorization: Bearer <token>

**Actualizar convocatoria**

    PUT /api/convocatorias/1
    Headers:
    Authorization: Bearer <token>
    Body (JSON):
    {
      "conNombre": "Convocatoria Actualizada",
      "conCantidadBenficiarios": 10
    }

**Eliminar convocatoria**

    DELETE /api/convocatorias/1
    Headers:
    Authorization: Bearer <token>

------------------------------------------------------------------------

### Tipos de Convocatoria

**Crear tipo**

    POST /api/tipoconvocatorias
    Headers:
    Authorization: Bearer <token>
    Body (JSON):
    {
      "tipNombre": "Tipo A"
    }

**Listar tipos**

    GET /api/tipoconvocatorias
    Headers:
    Authorization: Bearer <token>

**Actualizar tipo**

    PUT /api/tipoconvocatorias/1
    Headers:
    Authorization: Bearer <token>
    Body (JSON):
    {
      "tipNombre": "Tipo Actualizado"
    }

**Eliminar tipo**

    DELETE /api/tipoconvocatorias/1
    Headers:
    Authorization: Bearer <token>

------------------------------------------------------------------------

### Postulaciones

**Crear Postulación**

    POST /api/postulaciones
    Headers:
    Authorization: Bearer <token>
    Body (JSON):
    {
      "convocatoriaId": 1,
      "user":{
        "id": 1
      }
    }

**Ver todas las postulaciones**

    GET /api/postulaciones
    Headers:
    Authorization: Bearer <token>

------------------------------------------------------------------------

### Resultados

**Crear/Actualizar Resultado**

    POST /api/resultados
    Headers:
    Authorization: Bearer <token>
    Body (JSON):
    {
      "postulacionId": 1,
      "estado": "Aprobado"
    }

**Ver mi resultado**

    GET /api/resultados/mi-resultado
    Headers:
    Authorization: Bearer <token>

------------------------------------------------------------------------

### Usuarios

**Ver todos los usuarios**

    GET /api/usuarios
    Headers:
    Authorization: Bearer <token>

**Ver mi perfil**

    GET /api/usuarios/perfil
    Headers:
    Authorization: Bearer <token>

------------------------------------------------------------------------

### Funcionarios y Aprendices

**Listar Funcionarios**

    GET /api/funcionarios
    Headers:
    Authorization: Bearer <token>

**Listar Aprendices**

    GET /api/aprendices
    Headers:
    Authorization: Bearer <token>
