const pool = require('../config/db');

// POST /usuarios -> Registrar
const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, edad } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ ok: false, mensaje: 'nombre y email son obligatorios' });
    }

    const query = `
      INSERT INTO usuarios (nombre, email, edad)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const valores = [nombre, email, edad || null];

    const resultado = await pool.query(query, valores);
    return res.status(201).json({ ok: true, usuario: resultado.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ ok: false, mensaje: 'El email ya esta registrado' });
    }
    console.error(error);
    return res.status(500).json({ ok: false, mensaje: 'Error al crear el usuario' });
  }
};

// GET /usuarios -> Consultar todos
const obtenerUsuarios = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    return res.status(200).json({ ok: true, total: resultado.rowCount, usuarios: resultado.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, mensaje: 'Error al obtener los usuarios' });
  }
};

// GET /usuarios/:id -> Consultar por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({ ok: false, mensaje: `No existe un usuario con id ${id}` });
    }

    return res.status(200).json({ ok: true, usuario: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, mensaje: 'Error al obtener el usuario' });
  }
};

// PUT /usuarios/:id -> Actualizar
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, edad } = req.body;

    const existente = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (existente.rowCount === 0) {
      return res.status(404).json({ ok: false, mensaje: `No existe un usuario con id ${id}` });
    }

    const query = `
      UPDATE usuarios
      SET nombre = COALESCE($1, nombre),
          email = COALESCE($2, email),
          edad = COALESCE($3, edad)
      WHERE id = $4
      RETURNING *`;
    const valores = [nombre, email, edad, id];

    const resultado = await pool.query(query, valores);
    return res.status(200).json({ ok: true, usuario: resultado.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ ok: false, mensaje: 'El email ya esta registrado' });
    }
    console.error(error);
    return res.status(500).json({ ok: false, mensaje: 'Error al actualizar el usuario' });
  }
};

// DELETE /usuarios/:id -> Eliminar
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({ ok: false, mensaje: `No existe un usuario con id ${id}` });
    }

    return res.status(200).json({ ok: true, mensaje: 'Usuario eliminado correctamente', usuario: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, mensaje: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
