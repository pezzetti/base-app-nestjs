import { IsString, IsEmail } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDomain {
    @Field()
    @IsString()
    readonly fullName: string;

    @Field()
    @IsString()
    readonly password: string;

    @Field()
    @IsEmail()
    readonly email: string;
}
