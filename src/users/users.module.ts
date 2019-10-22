import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { CreateUserService } from './services/create.user.service';
import { User } from './domain/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserApplication } from './applications/create.user.application';
import { TYPES } from './interfaces/types';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    { provide: TYPES.services.ICreateUserService, useClass: CreateUserService },
    { provide: TYPES.applications.ICreateUserApplication, useClass: CreateUserApplication },
  ],
})
export class UsersModule {}
