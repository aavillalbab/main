import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Index } from 'typeorm';

import { Menu } from './menu';
import { Permission } from './permission';
import { Profile } from './profile';

@Entity({ name: 'menu_permission_profile' })
@Index(['profileId', 'menuId', 'permissionId'], { unique: true })
export class MenuPermissionProfile {
    @PrimaryColumn({
        name: 'profile_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    profileId!: number;

    @PrimaryColumn({
        name: 'menu_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    menuId!: number;

    @PrimaryColumn({
        name: 'permission_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    permissionId!: number;

    // relationships
    @ManyToOne(
        type => Profile,
        profile => profile.menuPermissionProfile
    )
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    public profile!: Profile;

    @ManyToOne(
        type => Menu,
        menu => menu.menuPermissionProfile
    )
    @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
    public menu!: Menu;

    @ManyToOne(
        type => Permission,
        permission => permission.menuPermissionProfile
    )
    @JoinColumn({ name: 'permission_id', referencedColumnName: 'id' })
    public permission!: Permission;
}
