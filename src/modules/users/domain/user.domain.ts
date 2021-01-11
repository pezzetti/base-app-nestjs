import { IsString, IsEmail } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UserDomain {
    @Field()
    @IsString()
    @ApiProperty()
    readonly fullName: string;

    @Field()
    @IsString()
    @ApiProperty()
    readonly password: string;

    @Field()
    @IsEmail()
    @ApiProperty()
    readonly email: string;
}
