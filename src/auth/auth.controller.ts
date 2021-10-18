import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { LocalAuthguard } from './guard/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {
    constructor(private readonly authService:AuthService){
}

    @UseGuards(LocalAuthguard)
    @Post('signin')
    async signIn(@Req() req){
        return await this.authService.signIn(req.user)
    }

    @Post('signup')
    async signUp(@Body() userDTO: UserDTO){
        return await this.authService.signUp(userDTO);
    }


}
