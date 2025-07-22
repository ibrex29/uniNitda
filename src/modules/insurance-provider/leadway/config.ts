import { CreateVehiclePolicyDTO } from './dto/autoBaseMotor.dto';
import { MotorInsuranceComprehensiveDTO } from './dto/comprehensive.dto';
import { CreatePolicyFromQuoteDTO } from './dto/create-policy-from-quote.dto';
import { MotorInsuranceDTO } from './dto/motorInsurance.dto';
import { quoteHealthDTO } from './dto/quoteHealth.dto';
import { LifeInsuranceDTO } from './dto/quoteLifeSavings.dto';
import { TravelInsuranceDTO } from './dto/travelInsurance.dto';

export const config = {
  'base-url':
    'https://mc.leadway.com/interBusinessConnection/interBusinessConnection.svc',

  quotation: {
    life: {
      education: {
        url: '/quotation/quoteEducationalSavings/',
        validator: LifeInsuranceDTO,
      },
      personal: {
        url: '/quotation/quotePersonalSavingsPlan/',
        validator: LifeInsuranceDTO,
      },
      leadway: {
        url: '/quotation/quoteLeadwaySavings',
        validator: LifeInsuranceDTO,
      },
    },
    motor: {
      'third-party': {
        url: '/quotation/thirdPartyMotor/',
        validator: MotorInsuranceDTO,
      },
      comprehensive: {
        url: '/quotation/motorInsuranceComprehensive/',
        validator: MotorInsuranceDTO,
      },
      'auto-base': {
        url: '/quotation/autoBaseMotor/',
        validator: MotorInsuranceDTO,
      },
    },
    travel: {
      individual: {
        url: '/quotation/travelInsurance/',
        validator: TravelInsuranceDTO,
      },
      family: {
        url: '/quotation/travelInsurance/',
        validator: TravelInsuranceDTO,
      },
    },
    health: {
      accident: {
        url: '/quotation/quoteHealth/',
        validator: quoteHealthDTO,
      },
    },
  },
  policy: {
    life: {
      education: {
        url: '/quotation/createPolicyFromQuote/',
        validator: CreatePolicyFromQuoteDTO,
      },
      personal: {
        url: '/quotation/createPolicyFromQuote/',
        validator: '',
      },
      leadway: {
        url: '/quotation/createPolicyFromQuote/',
        validator: '',
      },
    },
    motor: {
      'third-party': {
        url: '/quotation/createPolicyFromQuote/',
        validator: '',
      },
      comprehensive: {
        url: '/quotation/createPolicyFromQuote/',
        validator: MotorInsuranceComprehensiveDTO,
      },
      'auto-base': {
        url: '/quotation/createPolicyFromQuote/',
        validator: CreateVehiclePolicyDTO,
      },
    },
    travel: {
      individual: {
        url: '/quotation/createPolicyFromQuote/',
        validator: '',
      },
      family: {
        url: '/quotation/createPolicyFromQuote/',
        validator: '',
      },
    },
    health: {
      accident: {
        url: '/quotation/createPolicyFromQuote/',
        validator: '',
      },
    },
  },
};
