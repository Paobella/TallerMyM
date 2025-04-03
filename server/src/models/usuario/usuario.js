const express = require('express');
const pool = require('../../config/database');  // Asegúrate de que este path sea correcto
const router = express.Router();

// Endpoint para crear un usuario
router.post('/api/create-profile', async (req, res) => {
  const { nombre, apellidos, correo, telefono, cedula, rol } = req.body;

  // Validación básica: todos los campos son requeridos
  if (!nombre || !apellidos || !correo || !telefono || !cedula || !rol) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const query = `
      INSERT INTO Usuarios (nombre, apellidos, correo, telefono, cedula, rol)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [nombre, apellidos, correo, telefono, cedula, rol]);
    res.status(201).json({
      message: 'Perfil creado correctamente',
      insertId: result.insertId
    });
  } catch (err) {
    console.error('Error al insertar el perfil:', err);
    res.status(500).json({ error: 'Error interno del servidor. No se pudo crear el perfil.' });
  }
});

// Endpoint para obtener usuarios con búsqueda opcional por nombre
router.get('/api/users', async (req, res) => {
  try {
    const { search } = req.query;
    let query = "SELECT * FROM Usuarios";
    let params = [];

    if (search) {
      query += " WHERE nombre LIKE ?";
      params.push(`%${search}%`);
    }

    const [rows] = await pool.execute(query, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).json({ error: 'Error al obtener los usuarios. Intenta más tarde.' });
  }
});

// Endpoint para borrar un usuario por ID
router.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute("DELETE FROM Usuarios WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error('Error al eliminar el usuario:', err);
    res.status(500).json({ error: 'Error al eliminar el usuario. Intenta más tarde.' });
  }
});

module.exports = router;

