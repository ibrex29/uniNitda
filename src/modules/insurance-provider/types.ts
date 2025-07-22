import { Type } from '@nestjs/common';

type InsuranceTypes = 'health' | 'life' | 'motor' | 'travel';
export type InsuranceProviderUnit = {
  url: string;
  validator: Type<any>;
};

export type InsuranceProviderConfig = {
  'base-url': string;
  quotation: {
    [key in InsuranceTypes]: { [key in string]: InsuranceProviderUnit };
  };
  policy: {
    [key in InsuranceTypes]: { [key in string]: InsuranceProviderUnit };
  };
};
