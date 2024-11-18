import nodemailer from 'nodemailer';

const sendEmail = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, password } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bienvenido a Inventarios',
      text: `Hola ${name}, tu contraseña es: ${password}`,
    };
    try {
      await transporter.sendMail(message);
      res.status(200).json({ message: 'Email enviado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al enviar el email' });
    }
  }
};

export default sendEmail;
