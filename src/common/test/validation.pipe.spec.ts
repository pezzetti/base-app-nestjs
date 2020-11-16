import { IsString, IsEmail } from 'class-validator';
import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '../validation.pipe';

class TestDomain {
    @IsString()
    readonly fullName: string;

    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;
}

describe('ValidationPipe', () => {
    let validationPipe: ValidationPipe;
    const user: TestDomain = {
        email: 'rafael.pezzetti@gmail.com',
        fullName: 'Rafael Pezzetti',
        password: 'p455w0rd$',
    };

    describe('when data is not valid', () => {
        it('should throw error', done => {
            validationPipe = new ValidationPipe(TestDomain);
            const newUser: TestDomain = {
                email: 'rafael',
                fullName: 'test',
                password: 'p455w0rd$',
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
            validationPipe = new ValidationPipe(Test);
            const value = await validationPipe.transform(user, {
                data: '',
                type: 'body',
                metatype: TestDomain,
            });
            expect(value).toEqual(user);
        });
    });
});
