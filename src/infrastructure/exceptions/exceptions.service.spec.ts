import { ExceptionsService } from './exceptions.service';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { IFormatExceptionMessage } from '../../domain/exceptions/exceptions.interface';

describe('ExceptionsService', () => {
  let exceptionsService: ExceptionsService;

  beforeEach(() => {
    exceptionsService = new ExceptionsService();
  });

  it('should throw a BadRequestException with the correct data', () => {
    const exceptionData: IFormatExceptionMessage = {
      message: 'Bad request',
      code_error: 400,
    };

    try {
      exceptionsService.badRequestException(exceptionData);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual(exceptionData.message);
    }
  });

  it('should throw an InternalServerErrorException with the correct data', () => {
    const exceptionData: IFormatExceptionMessage = {
      message: 'Internal server error',
      code_error: 500,
    };

    try {
      exceptionsService.internalServerErrorException(exceptionData);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
      expect(error.message).toEqual(exceptionData.message);
    }
  });

  it('should throw a ForbiddenException with the correct data', () => {
    const exceptionData: IFormatExceptionMessage = {
      message: 'Forbidden',
      code_error: 403,
    };

    try {
      exceptionsService.forbiddenException(exceptionData);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
      expect(error.message).toEqual(exceptionData.message);
    }
  });

  it('should throw an UnauthorizedException with the correct data', () => {
    const exceptionData: IFormatExceptionMessage = {
      message: 'Unauthorized',
      code_error: 401,
    };

    try {
      exceptionsService.UnauthorizedException(exceptionData);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toEqual(exceptionData.message);
    }
  });
});
