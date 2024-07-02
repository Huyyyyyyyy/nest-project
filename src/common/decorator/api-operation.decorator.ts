import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

interface ApiOperationDecoratorOptions {
  type: any;
  summary: string;
  description: string;
}

export const ApiOperationDecorator = ({
  type,
  summary,
  description,
}: ApiOperationDecoratorOptions) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiUnauthorizedResponse({ description }),
    ApiBadRequestResponse({ description: 'Invalid data' }),
    ApiUnprocessableEntityResponse({ description: 'Invalid data' }),
    ApiForbiddenResponse({ description: 'Token is invalid' }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error, please try later',
    }),
    ApiOkResponse({
      type,
      description,
    }),
  );
};
