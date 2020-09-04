import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from './utils';

import { AuthModule } from './modules/auth/auth.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { LoginModule } from './modules/login/login.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
    imports: [
        AuthModule,
        EasyconfigModule.register({}),
        LoginModule,
        MailModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule { }
