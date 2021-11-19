import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global() // 👈 optional to make module global
@Module({
  imports: [  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
    MailerModule.forRoot({
      // imports: [ConfigModule], // import module if not enabled globally

        // transport: config.get("MAIL_TRANSPORT"),

        transport: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: 'yaroslav.brila@gmail.com',
            pass: '123',
          },
        },
        defaults: {
          from: `"No Reply" <${'yaroslav.bryla@gmail.com'}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}