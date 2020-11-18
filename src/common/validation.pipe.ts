import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(
        private classToValidateAgainst: Function,
        private validationOptions: ValidatorOptions = {}
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (!metatype || this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object, {
            whitelist: true,
            forbidNonWhitelisted: true,
            ...this.validationOptions,
        });

        if (errors.length > 0) {
            // Flatten all error messages
            const constraints: { [type: string]: string }[] = [];

            // ValidationError is a recursive type
            const findConstraints = (err: ValidationError): void => {
                if (err.constraints) constraints.push(err.constraints);
                if (err.children && err.children.length > 0)
                    err.children.forEach(child => findConstraints(child));
            };

            errors.forEach(err => findConstraints(err));

            throw new BadRequestException(
                'Validation Failed',
                constraints
                    .flatMap(constraint => Object.values(constraint))
                    .join(', ')
            );
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [this.classToValidateAgainst];
        return !types.includes(metatype);
    }
}
