import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { UserCollection } from 'src/database/firestore/collection/use.collection';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtCustomService } from 'src/common/services/jwt.service';
import { CustomResponse } from 'src/common/response/response.map';
@Injectable()
export class AuthService {
  SALT_ROUNDS = 10;
  constructor(
    private readonly userCollection: UserCollection,
    private readonly jwtService: JwtCustomService,
  ) {}
  // async onModuleInit() {
  //   const validate = await this.createToken({mail: 'ralbt@a.cl', password: '123456'});
  //   console.log('🚀 ~ AuthService ~ onModuleInit ~ validate:', validate)
  // }
  async createToken(createAuthDto: CreateAuthDto) {
    const user = await this.userCollection.getUser(createAuthDto.mail);
    const validatePasswordHash = await bcrypt.compare(createAuthDto.password, user.h_password);
    if (!validatePasswordHash) return new HttpErrorByCode[401]();
    const token = this.signAccessToken({mail: user.s_mail, shopingCartId: user.s_shoping_cart})
    const validate = await this.jwtService.validate(token);
    console.log('🚀 ~ AuthService ~ createToken ~ validate:', validate)
    return new CustomResponse({ code: '200', message: 'OK' }, token);
  }
  async registerUser(registerUserDto: RegisterUserDto) {
    const user = await this.userCollection.registerUser(registerUserDto);
    const token = this.signAccessToken({mail: user.s_mail, shopingCartId: user.s_shoping_cart})
    return new CustomResponse({ code: '200', message: 'OK' }, token);
  }
  async existUser(mail: string) {
    const user = await this.userCollection.getUser(mail) ? true : false;
    return new CustomResponse({ code: '200', message: 'OK' }, user)
  }
  signAccessToken(payload: any) {
    const token = this.jwtService.signToken(payload);
    return token;
  }
}
