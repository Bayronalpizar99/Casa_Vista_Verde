import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Ruta para el formulario de reserva
app.post('/api/send-email', async (req, res) => {
  const { name, email, checkIn, checkOut, guests, message } = req.body;

  // Configuración de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `Nueva solicitud de reserva de ${name}`,
    html: `
      <h1>Nueva Solicitud de Reserva</h1>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Fecha de Llegada:</strong> ${checkIn}</p>
      <p><strong>Fecha de Salida:</strong> ${checkOut}</p>
      <p><strong>Huéspedes:</strong> ${guests}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message || 'Sin mensaje adicional.'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: '¡Solicitud enviada con éxito!' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false, error: 'Hubo un error al enviar la solicitud.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});