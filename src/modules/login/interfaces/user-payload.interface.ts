import {
    BloodGroup,
    RHFactor,
    IdentificationType,
    Gender,
    MedicalProcedure,
    UserLog
} from 'src/database';

export interface UserPayload {
    sub: number;
    name: string;
    lastname: string;
    surname: string;
    birthday: Date;
    bloodGroup: BloodGroup;
    rhFactor: RHFactor;
    identificationType: IdentificationType;
    identificationValue: string;
    email: string;
    phone: string;
    cellphone: string;
    imagePath: string;
    state: number;
    gender: Gender;
    epsId: number;
    userLog: UserLog;
}
