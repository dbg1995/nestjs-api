import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { ErrorDTO } from './dto/error.dto';
import { ErrorDetailDTO } from './dto/error-detail.dto';
import { ERROR_MAPPING_RULE_CODES, ERROR_DEEP_MAX } from './error.constant';

@Injectable()
export class ErrorService {
  constructor(private i18nService: I18nService) {}

  async unauthorized(lang: string): Promise<Promise<ErrorDTO>> {
    return plainToClass(ErrorDTO, {
      code: ERROR_MAPPING_RULE_CODES.UNAUTHORIZED,
      title: await this.i18nService.t('error.unauthorized.title', { lang }),
      message: await this.i18nService.t('error.unauthorized.message', { lang }),
    });
  }

  async forbidden(lang: string): Promise<Promise<ErrorDTO>> {
    return plainToClass(ErrorDTO, {
      code: ERROR_MAPPING_RULE_CODES.FORBIDDEN,
      title: await this.i18nService.t('error.forbidden.title', { lang }),
      message: await this.i18nService.t('error.forbidden.message', { lang }),
    });
  }

  async notFoundError(lang: string): Promise<ErrorDTO> {
    return plainToClass(ErrorDTO, {
      code: ERROR_MAPPING_RULE_CODES.NOT_FOUND,
      title: await this.i18nService.t('error.not_found.title', { lang }),
      message: await this.i18nService.t('error.not_found.message', { lang }),
    });
  }

  async unprocessableEntity(lang: string, validationErrors: ValidationError[]): Promise<Promise<ErrorDTO>> {
    const errors: ErrorDetailDTO[] = [];
    const flattenValidationErrors = this.flattenValidationErrors(validationErrors);

    for (const validationError of flattenValidationErrors) {
      const { property, constraints, contexts } = validationError;
      for (const constraint of Object.keys(constraints)) {
        let i18nArgs = {
          property: await this.i18nService.t(`field.${this.getField(property)}`, { lang }),
        };

        if (contexts && contexts[constraint] && contexts[constraint].i18n) {
          i18nArgs = { ...i18nArgs, ...contexts[constraint].i18n };
        }

        const code = ERROR_MAPPING_RULE_CODES[constraint];
        const message = await this.i18nService.t(`error.${constraint}`, { lang, args: i18nArgs });

        errors.push(plainToClass(ErrorDetailDTO, { property, code, message }));
      }
    }

    return plainToClass(ErrorDTO, {
      code: ERROR_MAPPING_RULE_CODES.UNPROCESSABLE_ENTITY,
      title: await this.i18nService.t('error.unprocessable_entity.title', { lang }),
      message: await this.i18nService.t('error.unprocessable_entity.message', { lang }),
      errors,
    });
  }

  async internalServerError(lang: string): Promise<Promise<ErrorDTO>> {
    return plainToClass(ErrorDTO, {
      code: ERROR_MAPPING_RULE_CODES.INTERNAL_SERVER,
      title: await this.i18nService.t('error.internal_server.title', { lang }),
      message: await this.i18nService.t('error.internal_server.message', { lang }),
    });
  }

  private flattenValidationErrors(validationErrors: ValidationError[], parentProperty = ''): ValidationError[] {
    const errors = [];

    for (const validationError of validationErrors) {
      // Noted: Value is not array or object so it has no property. Use parent property instead
      if (!validationError.children && parentProperty) {
        validationError.property = parentProperty;
        errors.push(validationError);
        continue;
      }

      // Noted: Value is a property of array or object so append parent property to property
      if (parentProperty) {
        validationError.property = `${parentProperty}.${validationError.property}`;
      }

      // Noted: Value is a property of array or object and that object or array is very deeply in another object or array
      if (validationError.property.split('.').length > ERROR_DEEP_MAX) {
        continue;
      }

      // Noted: Value is a property of array or object
      if (!validationError.children.length) {
        errors.push(validationError);
        continue;
      }

      // Noted: Value is not array or object so it has no property
      errors.push(...this.flattenValidationErrors(validationError.children, validationError.property));
    }

    return errors;
  }

  private getField(property: string): string {
    const fields = property.split('.');
    const field = fields[fields.length - 1];
    //Noted: In case field is a index of element in array will return array name instead of index. Ex: array.0
    if (Number.isInteger(parseInt(field)) && fields[fields.length - 2]) {
      return fields[fields.length - 2];
    }

    return field;
  }
}
