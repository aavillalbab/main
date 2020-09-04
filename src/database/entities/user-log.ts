import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'user_logs' })
export class UserLog {
    @PrimaryColumn({
        name: 'user_id',
        type: 'int',
        unsigned: true
    })
    userId: number;

    @UpdateDateColumn({ name: 'last_login', type: 'timestamp' })
    lastLogin: Date;

    @Column({
        name: 'registration_step_number',
        type: 'int',
        width: 1,
        default: 0
    })
    registrationStepNumber: number;

    @Column({ name: 'state', type: 'bool', width: 1, default: false })
    state: number;

    // relationships
    @OneToOne(
        type => User,
        user => user.userLog
    )
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
}
