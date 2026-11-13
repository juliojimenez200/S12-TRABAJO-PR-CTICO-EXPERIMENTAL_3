# API REST de Usuarios — Práctica 3 (Desarrollo Web, UNEMI)

API REST desarrollada con **Node.js**, **Express** y **PostgreSQL** que implementa operaciones CRUD sobre una tabla de usuarios, cumpliendo con la guía G003-S12-SOFTWARE2019-PRESENCIAL-DESARROLLO WEB-B1.

## Tecnologías utilizadas
- Node.js
- Express
- PostgreSQL (driver `pg`)
- dotenv (variables de entorno)
- cors
- Postman (pruebas de endpoints)

## Funcionalidades implementadas
- `POST /usuarios` — Registrar un nuevo usuario
- `GET /usuarios` — Consultar todos los usuarios
- `GET /usuarios/:id` — Consultar un usuario por ID
- `PUT /usuarios/:id` — Actualizar un usuario
- `DELETE /usuarios/:id` — Eliminar un usuario
- Manejo de respuestas HTTP (200, 201, 400, 404, 409, 500) para casos de éxito y error

## Requisitos previos
- Node.js instalado
- PostgreSQL instalado y en ejecución
- Postman (para probar la API)

## Instalación y configuración

1. Clonar el repositorio e instalar dependencias:
   ```bash
   npm install
   ```

2. Crear la base de datos y la tabla ejecutando el script `sql/schema.sql` en PostgreSQL:
   ```bash
   psql -U postgres -c "CREATE DATABASE practica3_db;"
   psql -U postgres -d practica3_db -f sql/schema.sql
   ```

3. Copiar el archivo de variables de entorno y completar tus credenciales:
   ```bash
   cp .env.example .env
   ```

4. Iniciar el servidor:
   ```bash
   npm start
   ```
   El servidor quedará disponible en `http://localhost:3000`.

## Pruebas con Postman
Importar el archivo `postman_collection.json` incluido en este repositorio. Contiene las 5 peticiones (registrar, consultar todos, consultar por ID, actualizar y eliminar) listas para usarse contra `http://localhost:3000`.

## Estructura del proyecto
```
api-usuarios/
├── sql/
│   └── schema.sql
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── usuarios.controller.js
│   ├── routes/
│   │   └── usuarios.routes.js
│   └── app.js
├── postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Entregables de la práctica
- [ ] Video demostrativo (máx. 5 min) subido a Google Drive con permisos habilitados
- [ ] Código fuente subido a GitHub con este README
- [ ] PDF de entrega con los enlaces al video y al repositorio
