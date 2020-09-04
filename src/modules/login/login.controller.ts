import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    Query,
    Patch,
    UseGuards,
    Logger
} from '@nestjs/common';
import { Payload } from '../login/interfaces';
import { Request, Response } from 'express';
import { RolesGuard, Roles, User } from 'src/utils';
import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { APP } from 'src/config';

import { LoginDTO } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller(`${APP.baseURL}/login`)
@ApiTags(`Login`)
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({})
    async login(@Res() res: Response, @Body() loginDto: LoginDTO) {
        Logger.log(loginDto);
        try {
            const user = await this.loginService.getAuthenticatedUser(
                loginDto.email,
                loginDto.password
            );

            res.status(HttpStatus.OK).send({
                user: user.user,
                token: user.token
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).send({
                    message: error.message,
                    description: error.response.description
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Post('/changePassword')
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiOperation({})
    async changePassword(
        @Res() res: Response,
        @Body() data,
        @User() userLogued: Payload
    ) {
        try {
            const user = await this.loginService.changePassword(
                data.actual,
                data.new,
                userLogued.email
            );

            res.status(HttpStatus.OK).send();
        } catch (error) {
            if (error.status) {
                return res.status(error.status).send({
                    message: error.message,
                    description: error.response.description
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Post('/web')
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({})
    async loginWeb(@Res() res: Response, @Body() loginDto: LoginDTO) {
        Logger.log(loginDto);
        try {
            const user = await this.loginService.getAuthenticatedUserAdmin(
                loginDto.email,
                loginDto.password
            );

            res.status(HttpStatus.OK).send({
                user: user.user,
                token: user.token
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).send({
                    message: error.message,
                    description: error.response.description
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }
}
