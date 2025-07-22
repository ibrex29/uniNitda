import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from './config';
import { validate } from 'class-validator';
import { InsuranceProviderUnit } from '../types';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LeadwayAPIService {
  constructor(private httpService: HttpService) {}

  async getQuotation(packagePath: string, dto: object) {
    const packageConfig = this.getPackageConfig(packagePath, 'quotation');

    const dtoClass = packageConfig.validator;

    if (!dtoClass) {
        throw new BadRequestException('Validation class not specified in the package configuration.');
    }
    
    const dtoInstance = plainToInstance(dtoClass, dto);
    const errors = await validate(dtoInstance);
    
    if (errors.length > 0) {
        const errorMessages = errors
            .flatMap(err => Object.values(err.constraints || {}))
            .join('; ');
    
        throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }
  
    const url = `${config['base-url']}${packageConfig.url}`;
    return this.httpService.axiosRef.post(url, dto, {
      headers: { 'Content-Type': 'application/json' },
    });
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
}
