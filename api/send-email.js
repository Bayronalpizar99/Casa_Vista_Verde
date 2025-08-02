// api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, checkIn, checkOut, guests, message } = req.body;

    // Validar datos requeridos
    if (!name || !email || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ 
        success: false, 
        error: 'Faltan datos requeridos' 
      });
    }

    // Configuración de Nodemailer usando variables de entorno de Vercel
    const transporter = nodemailer.createTransporter({
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

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: '¡Solicitud enviada con éxito!' 
    });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Hubo un error al enviar la solicitud.' 
    });
  }
}