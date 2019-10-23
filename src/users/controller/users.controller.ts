import { Controller, Inject, Post, Res, Body, HttpStatus, UsePipes, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserDomain } from '../domain/user.domain';
import { TYPES } from '../interfaces/types';
import { ICreateUserApplication } from '../interfaces/applications/create.user.application.interface';
import { ValidationPipe } from 'src/common/validation.pipe';

@Controller('users')
export class UsersController {
    constructor(@Inject(TYPES.applications.ICreateUserApplication) private createUserApp: ICreateUserApplication) { }

    @UsePipes(new ValidationPipe())
    @Post('/create')
    async addStock(@Res() res, @Body() userDomain: UserDomain) {
        const stock = await this.createUserApp.create(userDomain);
        return res.status(HttpStatus.OK).json(stock);
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id) {
        return {requestedID: id};
    }
}
