import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { Token } from './shared/token';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req: any): Promise<Token> {
        return this.authService.login(req.user);
    }
}
