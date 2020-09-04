import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany
} from 'typeorm';
import { Payment } from './payment';

@Entity({ name: 'plans' })
export class Plan {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'int',
        unsigned: true
    })
    id: number;

    @Column({ name: 'name', type: 'nvarchar', length: 45 })
    name: string;

    @Column({ name: 'description', type: 'nvarchar', length: 245 })
    description: string;

    @Column({ name: 'cost', type: 'double' })
    cost: number;

    @Column({ name: 'consultations', type: 'int', width: 10 })
    consultations: number;

    @Column({ name: 'period', type: 'nvarchar', length: 45 })
    period: string;

    @Column({ name: 'state', type: 'tinyint', width: 1, default: 1 })
    state: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        select: true
    })
    createdAt: Date;

    @Column({ name: 'end_at', type: 'datetime' })
    endAt: Date;

    // relationship
    @OneToMany(
        type => Payment,
        payment => payment.plan
    )
    payments!: Payment[];
}
