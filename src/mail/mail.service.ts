import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // Отправляет PASSWORD на EMAIL юзера
  async send(password, userMail): Promise<void> {
    console.log(password, userMail);
    return this.mailerService.sendMail({
      to: userMail, //  для проверки который указан в .env (process.env.MAIL_USER)
      from: process.env.MAIL_FROM,
      subject: 'Welcome! There is your new password!',
      text: 'Please remember it!',
      html: `<b>${password}</b>`,
    });
  }
}
