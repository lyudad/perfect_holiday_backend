import * as nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export const SendEmail=async () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "kitty.keeling65@ethereal.email", // generated ethereal user
      pass: "563JGzwfsEWVtUHJPP", // generated ethereal password
    },
  });
  // create reusable transporter object using the default SMTP transport


  // send mail with defined transport object
  let info =await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "kitty.keeling65@ethereal.email", // list of receivers
    subject: "Hello from nodeMailer", // Subject line
    text: "Hi, this was sent from NestJS and NodeMailer", // plain text body
    html: "<body><h1>Hello world?</h1><p>This is test message from NodeMailer</p></body>", // html body

  });
  console.log(info)
  console.log("Message sent: %s", (await info).messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(await info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
