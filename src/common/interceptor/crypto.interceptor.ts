import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
import { CipherService } from 'src/common/services/cipher.service';
  
  @Injectable()
  export class CryptoInterceptor implements NestInterceptor {
    constructor(private readonly cipherService: CipherService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((result) => {
          if (result.data) {
            const data = this.cipherService.encrypt(JSON.stringify(result.data));
            result.data = data;
          }
          return result;
        }),
      );
    }
  }
  