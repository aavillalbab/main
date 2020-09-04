import { Injectable, BadRequestException, Logger } from '@nestjs/common';

import { DatabaseProvider } from 'src/database';
import { User, UserLog } from 'src/database/entities';

import { AuthService } from '../auth/auth.service';

import { userLogged, userPayload } from './functions';

@Injectable()
export class LoginService {
    constructor(private readonly authService: AuthService) {}

    async getAuthenticatedUser(email: string, password: string) {
        try {
            const user: User = await this.getUserByEmailAndPassword(
                email,
                password
            );

            const token = await this.authService.signJwt(userPayload(user));

            return {
                user: userLogged(user),
                token
            };
        } catch (error) {
            throw error;
        }
    }

    async changePassword(password: string, newPassword: string, email) {
        try {
            const connection = await DatabaseProvider.getConnection();
            const user = await connection
                .getRepository(User)
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where('user.email = :email', { email })
                .getOne();

            const isPassword = await User.isPassword(user.password, password);

            Logger.log('el pass ' + isPassword);

            if (isPassword) {
                user.password = newPassword;
                await connection.getRepository(User).save(user);
            }

            return 1;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Devuelve un usuario registrado en el sistema por medio de su correo y posterior verificación
     * de su password.
     * @param email correo electrónico
     * @param password contraseña del usuario asociada a su correo
     */
    private async getUserByEmailAndPassword(
        email: string,
        password: string
    ): Promise<User> {
        try {
            const connection = await DatabaseProvider.getConnection();

            const user = await connection
                .getRepository(User)
                .createQueryBuilder('user')
                .addSelect('user.password')
                .innerJoinAndSelect('user.profile', 'profile')
                .leftJoinAndSelect('profile.menus', 'menus')
                .leftJoinAndSelect('menus.permissions', 'permissions')
                .leftJoinAndSelect('menus.submenus', 'submenus')
                .leftJoinAndSelect('submenus.submenus', 'submenus2')
                .leftJoinAndSelect('submenus.permissions', '_permissions')
                .leftJoinAndSelect('submenus2.permissions', '_permissions2')
                .leftJoinAndSelect(
                    'user.medicalProcedures',
                    'medicalProcedures'
                )
                .leftJoinAndSelect('user.userLog', 'userLog')
                .where('user.email = :email', { email })
                // .andWhere('user.state = :state', { state: 0 })
                .andWhere('menus.father IS NULL')
                .orderBy('menus.id', 'ASC')
                .getOne();

            if (!user) {
                throw new BadRequestException(
                    'email Y/O contraseña incorrectos.'
                );
            } else {
                const isPassword = await User.isPassword(
                    user.password,
                    password
                );

                if (!isPassword) {
                    throw new BadRequestException(
                        'email Y/O contraseña incorrectos'
                    );
                }
            }

            await connection
                .createQueryBuilder()
                .update(UserLog)
                .set({})
                .where('userId = :userId', { userId: user.id })
                .execute();

            return user;
        } catch (error) {
            throw error;
        }
    }

    async getAuthenticatedUserAdmin(email: string, password: string) {
        try {
            const user: User = await this.getUserByEmailAndPasswordAdmin(
                email,
                password
            );

            const token = await this.authService.signJwt(userPayload(user));

            return {
                user: userLogged(user),
                token
            };
        } catch (error) {
            throw error;
        }
    }

    private async getUserByEmailAndPasswordAdmin(
        email: string,
        password: string
    ): Promise<User> {
        try {
            const connection = await DatabaseProvider.getConnection();

            const user = await connection
                .getRepository(User)
                .createQueryBuilder('user')
                .addSelect('user.password')
                .innerJoinAndSelect('user.profile', 'profile')
                .leftJoinAndSelect('profile.menus', 'menus')
                .leftJoinAndSelect('menus.permissions', 'permissions')
                .leftJoinAndSelect('menus.submenus', 'submenus')
                .leftJoinAndSelect('submenus.submenus', 'submenus2')
                .leftJoinAndSelect('submenus.permissions', '_permissions')
                .leftJoinAndSelect('submenus2.permissions', '_permissions2')
                .leftJoinAndSelect(
                    'user.medicalProcedures',
                    'medicalProcedures'
                )
                .leftJoinAndSelect('user.userLog', 'userLog')
                .where('user.email = :email', { email })
                // .andWhere('user.state = :state', { state: 0 })
                .andWhere('menus.father IS NULL')
                .andWhere('user.profile_id IN (1,2,3,5)')
                .orderBy('menus.id', 'ASC')
                .getOne();

            if (!user) {
                throw new BadRequestException(
                    'email Y/O contraseña incorrectos.'
                );
            } else {
                const isPassword = await User.isPassword(
                    user.password,
                    password
                );

                if (!isPassword) {
                    throw new BadRequestException(
                        'email Y/O contraseña incorrectos'
                    );
                }
            }

            await connection
                .createQueryBuilder()
                .update(UserLog)
                .set({})
                .where('userId = :userId', { userId: user.id })
                .execute();

            return user;
        } catch (error) {
            throw error;
        }
    }
}
