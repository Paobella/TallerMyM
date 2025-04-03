const express = require('express');
const Usuario = require('../../models/usuario/usuario');  
const { sendEmail } = require('../../services/emailServices');  
const router = express.Router();

// Ruta para verificar si el correo está registrado y enviar un correo de verificación
router.post('/api/usuario/send-email', async (req, res) => {
  const { email, nombre } = req.body;

  // Validación de entrada
  if (!email || !nombre) {
    return res.status(400).json({ success: false, message: 'El correo y el nombre son obligatorios' });
  }

  // Validación de formato de correo electrónico (opcional)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'El correo electrónico no tiene un formato válido' });
  }

  try {
    // Buscar el correo en la base de datos
    const user = await Usuario.findOne({ email: email });

    // Si el usuario existe, retorna un mensaje
    if (user) {
      return res.json({ success: false, message: 'El correo ya está registrado' });
    }

    // Enviar correo si el usuario no está registrado
    await sendEmail(email, nombre);

    // Respuesta exitosa
    return res.json({ success: true, message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error al verificar correo:', error);
    return res.status(500).json({ success: false, message: 'Error al acceder a la base de datos' });
  }
});

module.exports = router;
