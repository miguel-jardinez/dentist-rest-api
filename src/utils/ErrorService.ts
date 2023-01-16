import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

type ErrorCodes = '23505' | 'u-404' | '404';

@Injectable()
export class ErrorService {
  errorHandling(errorCode?: ErrorCodes, details?) {
    let message;
    switch (errorCode) {
      case 'u-404':
        message = `user ${details} do not exists`;
        throw new HttpException(message, HttpStatus.NOT_FOUND);

      case '404':
        message = `user ${details} do not exists`;
        throw new HttpException(message, HttpStatus.NOT_FOUND);

      case '23505':
        message = `Email ${details} already exists`;
        throw new HttpException(message, HttpStatus.CONFLICT);

      default:
        message = 'Please contact service care or try again';
        throw new HttpException(message, HttpStatus.BAD_GATEWAY);
    }
  }
}
