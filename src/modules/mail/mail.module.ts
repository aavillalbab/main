import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
// app.module.ts

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.mi.com.co',
                port: 587,
                secure: false,
                auth: {
                    user: 'administrador@esculappio.com.co',
                    pass: 'Admin123'
                },
                tls: {
                    rejectUnauthorized: false
                }
            },
            defaults: {
                from: 'administrador@esculappio.com.co'
            }
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
