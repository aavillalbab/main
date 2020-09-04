import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import { Menu } from './menu';
import { MenuPermissionProfile } from './menu-permission-profile';
import { Profile } from './profile';

@Entity({ name: 'permissions' })
export class Permission {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 50 })
    name: string;

    @Column({ name: 'description', type: 'varchar', length: 50 })
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
        menuPermissionProfile => menuPermissionProfile.permission
    )
    menuPermissionProfile!: MenuPermissionProfile[];
}
