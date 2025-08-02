// api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Request body:', req.body);
    console.log('Environment variables check:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'NOT_SET',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'NOT_SET'
    });

    const { name, email, checkIn, checkOut, guests, message } = req.body;

    // Validar datos requeridos
    if (!name || !email || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ 
        success: false, 
        error: 'Faltan datos requeridos' 
      });
    }

    // Validar variables de entorno
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Variables de entorno faltantes');
      return res.status(500).json({ 
        success: false, 
        error: 'Configuración del servidor incompleta' 
      });
    }

    // Configuración de Nodemailer usando variables de entorno de Vercel
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🏡 Nueva Reserva - ${name} | ${checkIn} al ${checkOut}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Solicitud de Reserva</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2d5a3d 0%, #4a7c59 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px;">
                🏡 Casa Vista Verde
              </h1>
              <p style="color: #e8f5e8; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                Nueva Solicitud de Reserva
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Greeting -->
              <div style="background-color: #f8fcf9; border-left: 4px solid #4a7c59; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #2d5a3d; margin: 0 0 10px 0; font-size: 22px;">
                  ¡Nueva solicitud de reserva recibida!
                </h2>
                <p style="color: #5a7c69; margin: 0; font-size: 16px;">
                  Un huésped está interesado en reservar tu hermosa casa rural.
                </p>
              </div>

              <!-- Guest Info -->
              <div style="background-color: #ffffff; border: 1px solid #e5f2e5; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="color: #2d5a3d; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                  👤 Información del Huésped
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: 600; width: 120px;">Nombre:</td>
                    <td style="padding: 8px 0; color: #2d5a3d; font-size: 16px; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${email}" style="color: #4a7c59; text-decoration: none; font-weight: 500;">${email}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Reservation Details -->
              <div style="background-color: #ffffff; border: 1px solid #e5f2e5; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="color: #2d5a3d; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center;">
                  📅 Detalles de la Reserva
                </h3>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                  <div style="flex: 1; min-width: 200px;">
                    <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%); padding: 20px; border-radius: 8px; text-align: center;">
                      <div style="color: #4a7c59; font-size: 14px; font-weight: 600; margin-bottom: 5px;">LLEGADA</div>
                      <div style="color: #2d5a3d; font-size: 18px; font-weight: 700;">${new Date(checkIn).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                  </div>
                  <div style="flex: 1; min-width: 200px;">
                    <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%); padding: 20px; border-radius: 8px; text-align: center;">
                      <div style="color: #4a7c59; font-size: 14px; font-weight: 600; margin-bottom: 5px;">SALIDA</div>
                      <div style="color: #2d5a3d; font-size: 18px; font-weight: 700;">${new Date(checkOut).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 20px; text-align: center;">
                  <div style="background-color: #4a7c59; color: white; padding: 15px; border-radius: 8px; display: inline-block;">
                    <span style="font-size: 14px; opacity: 0.9;">HUÉSPEDES</span><br>
                    <span style="font-size: 24px; font-weight: 700;">${guests} ${guests === 1 ? 'persona' : 'personas'}</span>
                  </div>
                </div>
                <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
                  Duración: ${Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} ${Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) === 1 ? 'noche' : 'noches'}
                </div>
              </div>

              <!-- Message -->
              ${message ? `
              <div style="background-color: #ffffff; border: 1px solid #e5f2e5; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="color: #2d5a3d; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                  💬 Mensaje del Huésped
                </h3>
                <div style="background-color: #f8fcf9; padding: 20px; border-radius: 8px; border-left: 4px solid #4a7c59;">
                  <p style="color: #2d5a3d; margin: 0; font-size: 16px; line-height: 1.6; font-style: italic;">
                    "${message}"
                  </p>
                </div>
              </div>
              ` : ''}

              <!-- Action Buttons -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}?subject=Re: Reserva Casa Vista Verde - ${checkIn} al ${checkOut}" 
                   style="background: linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; margin: 0 10px 10px 0; box-shadow: 0 4px 12px rgba(74, 124, 89, 0.3);">
                  ✉️ Responder al Huésped
                </a>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #f8fcf9; padding: 25px 30px; border-top: 1px solid #e5f2e5; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 14px;">
                Este email fue generado automáticamente desde tu formulario de contacto.<br>
                <strong>Casa Vista Verde</strong> • Alajuela, Costa Rica
              </p>
              <div style="margin-top: 15px;">
                <span style="color: #4a7c59; font-size: 12px;">🌿 Turismo Rural Sostenible 🌿</span>
              </div>
            </div>

          </div>
        </body>
        </html>
      `,
    };

    console.log('Intentando enviar email...');
    await transporter.sendMail(mailOptions);
    console.log('Email enviado exitosamente');
    
    res.status(200).json({ 
      success: true, 
      message: '¡Solicitud enviada con éxito!' 
    });

  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Hubo un error al enviar la solicitud.',
      details: error.message
    });
  }
}