import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
    log(message: string) {
        console.log(message);
    }

    error(message: string, trace: string) {
        console.error(message, trace);
    }

    warn(message: string) {
        console.warn(message);
    }

    debug(message: string) {
        console.debug(message);
    }
}
