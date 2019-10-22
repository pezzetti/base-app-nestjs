import { Controller, Inject, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { UserDomain } from '../domain/user.domain';
import { TYPES } from '../interfaces/types';
import { ICreateUserApplication } from '../interfaces/applications/create.user.application.interface';

@Controller('users')
export class UsersController {
    constructor(@Inject(TYPES.applications.ICreateUserApplication) private createUserApp: ICreateUserApplication) { }

    @Post('/create')
    async addStock(@Res() res, @Body() userDomain: UserDomain) {
        const stock = await this.createUserApp.create(userDomain);
        return res.status(HttpStatus.OK).json(stock);
    }
}
