-- Ejecutar dentro de psql o pgAdmin, conectado a la base de datos practica3_db

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    edad INTEGER,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo (opcional)
INSERT INTO usuarios (nombre, email, edad) VALUES
('Julio Perez', 'julio.perez@example.com', 22),
('Maria Lopez', 'maria.lopez@example.com', 25)
ON CONFLICT (email) DO NOTHING;
