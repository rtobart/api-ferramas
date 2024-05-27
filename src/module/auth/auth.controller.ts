import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  createToken(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createToken(createAuthDto);
  }

  @Post('/register')
  register(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @Get('/exist/:mail')
  existUser(@Param('mail') mail: string) {
    console.log('🚀 ~ AuthController ~ existUser ~ mail:', mail)
    return this.authService.existUser(mail);
  }
}
