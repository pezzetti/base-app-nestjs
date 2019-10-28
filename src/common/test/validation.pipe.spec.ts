import { ValidationPipe } from '../../common/validation.pipe';
import { IsString, IsEmail } from 'class-validator';
import { BadRequestException, HttpException } from '@nestjs/common';

export class TestDomain {
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
    describe('when no data is sent', () => {
        it('should throw error', async () => {
            validationPipe = new ValidationPipe();
            try {
                await validationPipe.transform(null, { data: '', type: 'body', metatype: String });
            } catch (error) {
                expect(error.message.message).toEqual('No data submitted');
                expect(error.message.statusCode).toEqual(400);
                expect(error).toBeInstanceOf(BadRequestException);
            }
        });
    });
    describe('when data is not valid', () => {
        it('should throw error', async () => {
            validationPipe = new ValidationPipe();
            const newUser: TestDomain = {
                email: 'rafael',
                fullName: 'test',
                password: 'p455w0rd$',
            };
            try {
                await validationPipe.transform(newUser, { data: '', type: 'body', metatype: TestDomain });
            } catch (error) {
                expect(error.message.message).toEqual('Invalid Payload');
                expect(error.message.errors.emailisEmail).toEqual('email must be an email');
                expect(error).toBeInstanceOf(HttpException);
            }
        });
    });

    describe('when no transform needed', () => {
        it('should get the data', async () => {
            validationPipe = new ValidationPipe();
            const obj = { test: 'something' };
            const value = await validationPipe.transform(obj, { data: '', type: 'body', metatype: String });
            expect(value).toEqual(obj);
        });
    });
    describe('when send domain object', () => {
        it('needs to validate', async () => {
            validationPipe = new ValidationPipe();
            const value = await validationPipe.transform(user, { data: '', type: 'body', metatype: TestDomain });
            expect(value).toEqual(user);
        });
    });
});
