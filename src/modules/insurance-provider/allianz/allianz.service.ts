import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from './config';
import { validate } from 'class-validator';
import { InsuranceProviderUnit } from '../types';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AllianzAPIService {
  constructor(private httpService: HttpService) {}

  async getQuotation(packagePath: string, dto: object) {
    const packageConfig = this.getPackageConfig(packagePath, 'quotation');

    const dtoClass = packageConfig.validator;

    if (!dtoClass) {
      throw new BadRequestException(
        'Validation class not specified in the package configuration.',
      );
    }

    const dtoInstance = plainToInstance(dtoClass, dto);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      const errorMessages = errors
        .flatMap((err) => Object.values(err.constraints || {}))
        .join('; ');

      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }

    const url = `${config['base-url']}${packageConfig.url}`;
    try {
      const response = await this.httpService.axiosRef.post(url, dto, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: await this.getAuthToken(),
        },
      });

      return {
        // Provide a uniform response object for all insurance providers
      };
    } catch (error) {
      if (error.response) {
        console.log(error.config.data);
        console.log(error.response.status, error.response.data);
      }
    }
  }

  private getPackageConfig(
    packagePath: string,
    quotationOrPolicy: 'quotation' | 'policy',
  ) {
    const steps = packagePath.split(':').slice(1); // remove the insurance part
    let obj = config[quotationOrPolicy];
    for (const step of steps) {
      obj = obj[step];
      if (!obj) return null;
    }

    return obj as unknown as InsuranceProviderUnit;
  }

  private async getAuthToken() {
    const url = `${config['base-url']}/traveltest/token`;
    try {
      const response = await this.httpService.axiosRef.post(
        url,
        new URLSearchParams({
          username: 'umebuike@gmail.com',
          password: 'Allianz123@',
          grant_type: 'password',
        }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return response.data.access_token;
    } catch (error) {
      if (error.response) {
        console.log(error.config.data);
        console.log(error.response.status, error.response.data);
      }
    }
  }
}
