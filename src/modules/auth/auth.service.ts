import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    /**
     * Devuelve el token JWT del usuario logueado.
     *
     * @param userLogged usuario logueado
     */
    async signJwt(userLogged: any) {
        try {
            return this.jwtService.sign(userLogged);
        } catch (error) {
            throw error;
        }
    }
}
