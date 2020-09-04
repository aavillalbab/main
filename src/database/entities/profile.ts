import {
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import { Menu } from './menu';
import { MenuPermissionProfile } from './menu-permission-profile';
import { User } from './user';

@Entity({ name: 'profiles' })
export class Profile {
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
        menuPermissionProfile => menuPermissionProfile.profile
    )
    menuPermissionProfile!: MenuPermissionProfile[];

    @OneToMany(
        type => User,
        user => user.profile
    )
    users!: User[];

    //comentar para generar migracion
    @ManyToMany(type => Menu)
    @JoinTable({
        name: 'menu_permission_profile',
        joinColumn: { referencedColumnName: 'id', name: 'profile_id' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'menu_id' }
    })
    menus!: Menu[];
}
