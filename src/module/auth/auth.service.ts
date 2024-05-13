import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { UserCollection } from 'src/database/firestore/collection/use.collection';
import { CustomResponse } from 'src/common/response/response.map';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from 'src/common/env/config.env';
@Injectable()
export class AuthService {
  SALT_ROUNDS = 10;
  constructor(
    private readonly userCollection: UserCollection,
    private readonly jwtService: JwtService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}
  async onModuleInit() {
    const validate = await this.createToken({mail: 'ralbt@a.cl', password: '123456'});
    console.log('🚀 ~ AuthService ~ onModuleInit ~ validate:', validate)
  }
  async createToken(createAuthDto: CreateAuthDto) {
    const user = await this.userCollection.getUser(createAuthDto.mail);
    const validatePasswordHash = await bcrypt.compare(createAuthDto.password, user.h_password);
    if (!validatePasswordHash) return new HttpErrorByCode[401]();
    return this.signAccessToken({mail: user.s_mail, shopingCartId: user.s_shoping_cart})
  }
  registerUser(registerUserDto: RegisterUserDto) {
    return this.userCollection.registerUser(registerUserDto);
  }
  signAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      privateKey: this.configService.jwt.privateKey,
      expiresIn: this.configService.jwt.expiresIn,
      algorithm: 'HS256',
    });
  }
}
