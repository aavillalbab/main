import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne
} from 'typeorm';

import { compare, genSaltSync, hashSync } from 'bcrypt';
import { Profile } from './profile';
import { UserLog } from './user-log';

export enum BloodGroup {
    A = 'A',
    B = 'B',
    AB = 'AB',
    O = 'O'
}

export enum RHFactor {
    POSITIVE = '+',
    NEGATIVE = '-'
}

export enum Gender {
    MALE = 'M',
    FEMALE = 'F',
    OTHER = 'OTHER'
}

export enum IdentificationType {
    CITIZENSHIP_CARD = 'Cédula de Ciudadanía',
    FOREIGNER_ID = 'Cédula de Extranjería',
    PASSPORT = 'Pasaporte',
    CIVIL_REGISTRATION = 'Registro Civil',
    IDENTITY_CARD = 'Tarjeta de Identidad'
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'int',
        unsigned: true
    })
    id: number;

    @Column({ name: 'name', type: 'nvarchar', length: 120 })
    name: string;

    @Column({ name: 'lastname', type: 'nvarchar', length: 120 })
    lastname: string;

    @Column({ name: 'surname', type: 'nvarchar', length: 120, nullable: true })
    surname: string;

    @Column({ name: 'birthday', type: 'date', nullable: true })
    birthday: Date;

    @Column({
        name: 'gender',
        type: 'enum',
        enum: Gender,
        nullable: true
    })
    gender: Gender;

    @Column({
        name: 'blood_group',
        type: 'enum',
        enum: BloodGroup,
        nullable: true
    })
    bloodGroup: BloodGroup;

    @Column({ name: 'rh_factor', type: 'enum', enum: RHFactor, nullable: true })
    rhFactor: RHFactor;

    @Column({
        name: 'identification_type',
        type: 'enum',
        enum: IdentificationType,
        nullable: true
    })
    identificationType: IdentificationType;

    @Column({
        name: 'identification_value',
        type: 'nvarchar',
        width: 20,
        nullable: true
    })
    identificationValue: string;

    @Column({ name: 'email', type: 'nvarchar', unique: true, length: 120 })
    email: string;

    @Column({
        name: 'password',
        type: 'nvarchar',
        nullable: true,
        select: false,
        length: 120
    })
    password: string;

    @Column({ name: 'phone', type: 'nvarchar', nullable: true, length: 120 })
    phone: string;

    @Column({
        name: 'cellphone',
        type: 'nvarchar',
        nullable: true,
        length: 120
    })
    cellphone: string;

    @Column({
        name: 'image_path',
        type: 'nvarchar',
        nullable: true,
        length: 50
    })
    imagePath: string;

    @Column({ name: 'accepted_terms', type: 'boolean', default: false })
    acceptedTerms: number;

    @Column({ name: 'state', type: 'tinyint', width: 1, default: 0 })
    state: number;

    @Column({
        name: 'afiliation_type_id',
        type: 'int',
        width: 11,
        unsigned: true,
        nullable: true
    })
    afiliationTypeId: number;

    @Column({
        name: 'eps_id',
        type: 'int',
        width: 11,
        unsigned: true,
        nullable: true
    })
    epsId: number;

    @Column({
        name: 'neightboor_id',
        type: 'int',
        width: 11,
        unsigned: true,
        nullable: true
    })
    neightboorId: number;

    @Column({ name: 'profile_id', type: 'int', width: 11, unsigned: true })
    profileId: number;

    @Column({
        name: 'professionalNumber',
        type: 'nvarchar',
        length: 45,
        nullable: true
    })
    professionalNumber: string;

    @Column({
        name: 'signPath',
        type: 'nvarchar',
        length: 200,
        nullable: true
    })
    signPath: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', select: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    encryptPassword(): void {
        this.password = hashSync(this.password, genSaltSync());
    }

    static async isPassword(encodedPassword: string, password: string) {
        return await compare(password, encodedPassword);
    }

    // relationships

    @ManyToOne(
        type => Profile,
        profile => profile.users
    )
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile!: Profile;


    @OneToOne(
        type => UserLog,
        userLog => userLog.user
    )
    userLog: UserLog;
}
