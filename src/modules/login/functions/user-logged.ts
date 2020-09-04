import { User } from 'src/database/entities';

// import { DatesHelper } from 'src/utils';

import { UserPayload, Payload } from '../interfaces';

/**
 * Objeto que se envía cuando un usuario ingresa correctamente a la plataforma.
 *
 * @param user
 * @param modules
 */
export function userLogged(user: User): UserPayload {
    return {
        sub: user.id,
        name: user.name,
        lastname: user.lastname,
        surname: user.surname,
        birthday: user.birthday,
        bloodGroup: user.bloodGroup,
        rhFactor: user.rhFactor,
        identificationType: user.identificationType,
        identificationValue: user.identificationValue,
        email: user.email,
        phone: user.phone,
        cellphone: user.cellphone,
        imagePath: user.imagePath,
        gender: user.gender,
        state: user.state,
        userLog: user.userLog,
        epsId: user.epsId
    };
}

/**
 * Objeto para armar el payload para el JWT (token de autenticación).
 *
 * @param user
 */
export function userPayload(user: User): Payload {
    return {
        sub: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        cellphone: user.cellphone,
        role: user.profile.description,
        menus: user.profile.menus.map(m => {
            return {
                id: m.id,
                name: m.name,
                permissions: m.permissions.map(p => {
                    return { id: p.id, name: p.name };
                }),
                show: m.show,
                submenus: m.submenus.map(sm => {
                    return {
                        id: sm.id,
                        name: sm.name,
                        permissions: sm.permissions.map(p => {
                            return { id: p.id, name: p.name };
                        }),
                        show: sm.show,
                        submenus: sm.submenus.map(sm2 => {
                            return {
                                id: sm2.id,
                                name: sm2.name,
                                permissions: sm2.permissions.map(p2 => {
                                    return { id: p2.id, name: p2.name };
                                }),
                                show: sm2.show
                            };
                        })
                    };
                })
            };
        })
    };
}
