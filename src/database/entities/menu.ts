import {
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';

import { MenuPermissionProfile } from './menu-permission-profile';
import { Permission } from './permission';

@Entity({ name: 'menus' })
export class Menu {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'name', type: 'nvarchar', length: 50 })
    name: string;

    @Column({ name: 'description', type: 'nvarchar', length: 50 })
    description: string;

    @Column({
        name: 'father',
        type: 'int',
        width: 10,
        nullable: true,
        unsigned: true
    })
    father: number;

    @Column({
        name: 'show',
        type: 'int',
        width: 10,
        nullable: true,
        unsigned: true
    })
    show: number;

    @Column({ name: 'is_father', type: 'tinyint', default: 0, width: 1 })
    isFather: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        select: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        select: false
    })
    updatedAt: Date;

    // relationships
    @OneToMany(
        type => MenuPermissionProfile,
        menuPermissionProfile => menuPermissionProfile.menu
    )
    menuPermissionProfile!: MenuPermissionProfile[];

    @ManyToOne(
        type => Menu,
        menu => menu.submenus
    )
    @JoinColumn({ name: 'father', referencedColumnName: 'id' })
    submenu!: Menu;

    @OneToMany(
        type => Menu,
        menu => menu.submenu,
        { nullable: true }
    )
    submenus!: Menu[];

    // comentar para generar migracion
    @ManyToMany(type => Permission)
    @JoinTable({
        name: 'menu_permission_profile',
        joinColumn: { referencedColumnName: 'id', name: 'menu_id' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'permission_id' }
    })
    permissions!: Permission[];
}
