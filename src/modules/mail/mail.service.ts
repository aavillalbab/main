import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(email: string, text: string) {
        try {
            const response = await this.mailerService.sendMail({
                to: email,
                from: 'administrador@esculappio.com.co',
                subject: 'Has solicitado recuperar la contraseña ✔',
                text: text
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}
