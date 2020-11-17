import {
    IsString,
    IsEmail,
    ValidateNested,
    IsBoolean,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HttpException } from '@nestjs/common';
import { ValidationPipe } from '../validation.pipe';

class TestToken {
    @IsString()
    readonly jwt: string;

    @IsBoolean()
    readonly valid: boolean;
}

class TestDomain {
    @IsString()
    readonly fullName: string;

    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;

    @ValidateNested()
    @Type(() => TestToken)
    @IsNotEmpty()
    readonly token: TestToken;
}

describe('ValidationPipe', () => {
    let validationPipe: ValidationPipe;
    const user: TestDomain = {
        email: 'rafael.pezzetti@gmail.com',
        fullName: 'Rafael Pezzetti',
        password: 'p455w0rd$',
        token: {
            jwt: '123',
            valid: true,
        },
    };

    describe('when data is not valid', () => {
        it('should throw error', done => {
            validationPipe = new ValidationPipe(TestDomain);
            const newUser = {
                email: 'rafael',
                fullName: 'test',
                password: 'p455w0rd$',
                token: {
                    jwt: '123',
                    valid: false,
                },
            };

            validationPipe
                .transform(newUser, {
                    data: '',
                    type: 'body',
                    metatype: TestDomain,
                })
                .then(() => done('Error, Should not get here'))
                .catch(error => {
                    expect(error.message.message).toEqual('Validation Failed');
                    expect(error.message.error).toEqual(
                        'email must be an email'
                    );
                    expect(error).toBeInstanceOf(HttpException);
                    done();
                });
        });

        it('should concatenate the result for nested objects', done => {
            validationPipe = new ValidationPipe(TestDomain);
            const newUser = {
                email: 'rafael',
                fullName: 'test',
                password: 'p455w0rd$',
                token: {
                    valid: 321,
                },
            };

            validationPipe
                .transform(newUser, {
                    data: '',
                    type: 'body',
                    metatype: TestDomain,
                })
                .then(() => done('Error, Should not get here'))
                .catch(error => {
                    expect(error.message.message).toEqual('Validation Failed');
                    expect(error.message.error).toEqual(
                        'email must be an email, jwt must be a string, valid must be a boolean value'
                    );
                    expect(error).toBeInstanceOf(HttpException);
                    done();
                });
        });
    });

    describe('when no transform needed', () => {
        it('should get the data', async () => {
            validationPipe = new ValidationPipe(TestDomain);
            const obj = { test: 'something' };
            const value = await validationPipe.transform(obj, {
                data: '',
                type: 'body',
                metatype: String,
            });
            expect(value).toEqual(obj);
        });
    });

    describe('when send domain object', () => {
        it('needs to validate', async () => {
            validationPipe = new ValidationPipe(TestDomain);
            const value = await validationPipe.transform(user, {
                data: '',
                type: 'body',
                metatype: TestDomain,
            });
            expect(value).toEqual(user);
        });
    });
});
