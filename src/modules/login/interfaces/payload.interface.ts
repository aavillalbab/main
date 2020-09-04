interface Permission {
    id: number;
    name: string;
}

interface SubMenu {
    id: number;
    name: string;
    permissions: Permission[];
    submenus: SubMenu2[];
}

interface SubMenu2 {
    id: number;
    name: string;
    permissions: Permission[];
    show: number;
}

interface Menu {
    id: number;
    name: string;
    permissions: Permission[];
    submenus: SubMenu[];
    show: number;
}

export interface Payload {
    /** Id en la tabla de usuarios (users) */
    sub: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    cellphone: string;
    role: string;
    menus?: Menu[];
}
