import { IsString, IsEmail } from 'class-validator';

export class UserDomain {
    @IsString()
    readonly fullName: string;

    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;
}
