import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { UserEntity } from '../entity/user.entity';
import { RegisterUserDto } from 'src/module/auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCollection {
  constructor(
    @Inject(UserEntity.collectionName)
    private userEntity: CollectionReference<UserEntity>,
  ) {}
async registerUser(registerUserDto: RegisterUserDto) {
  try {
      const password = await bcrypt.hash(registerUserDto.password, 10);
        const newUser: UserEntity = {
            s_mail: registerUserDto.mail,
            h_password: password,
            s_shoping_cart: registerUserDto.shopingCartId,
        }
        const docRef = await this.userEntity.add(newUser);
        const snapshot = await docRef.get();
        const data: UserEntity = {
            _id: snapshot.id,
            ...snapshot.data(),
        };
        return data;
    } catch (e: any) {
        console.error(JSON.stringify(e));
        throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
}
  async getUser(mail: string) {
    try {
      const snapshot = await this.userEntity
      .where('s_mail', '==', mail)
      .get();

      if (snapshot.empty) {
        return;
      }

      return snapshot.docs.map((element) => {
        const data: UserEntity = {
          _id: element.id,
          ...element.data(),
        };
        return data;
      })[0];
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }
}
