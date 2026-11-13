const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de salud
app.get('/', (req, res) => {
  res.status(200).json({ ok: true, mensaje: 'API REST de Usuarios funcionando correctamente' });
});

app.use('/usuarios', usuariosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
