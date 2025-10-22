import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post("/login")
    funLogin(@Body() datos: loginAuthDto) {
        return this.authService.login(datos);
    }
}
