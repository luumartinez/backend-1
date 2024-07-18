const transporter = require('./nodemailer')

const registroUsuario = async (nombre) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `Bienvenido a nuestra página 👻" <${process.env.GMAIL_USER}> `, // sender address
      to: 'maluisina.martinez@gmail.com', // list of receivers
      subject: "Hello ✔", // Subject line
      html: `
      <h1>Bievenidos a nuestra comunidad</h1>
            `
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
  module.exports = {
    registroUsuario
  }