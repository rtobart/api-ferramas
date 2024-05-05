import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  createToken(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  registerUser(registerUserDto: RegisterUserDto) {
    return 'This action adds a new auth';
  }
}
