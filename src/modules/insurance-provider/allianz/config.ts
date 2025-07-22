import { CreateFamilyPolicyDto } from './dto/create-family-travel-policy.dto';
import { CreateIndividualTravelPolicyDto } from './dto/create-individual-travel-policy.dto';
import { GetIndividualTravelQuotationDto } from './dto/get-individual-travel-quotation.dto';

export const config = {
  'base-url': 'https://app.allianz.ng',

  quotation: {
    travel: {
      individual: {
        url: '/traveltest/api/Quote',
        validator: GetIndividualTravelQuotationDto,
      },
      family: {
        url: '/traveltest/api/Quote',
        validator: GetIndividualTravelQuotationDto,
      },
    },
  },
  policy: {
    travel: {
      individual: {
        url: '/traveltest/api/individualBooking',
        validator: CreateIndividualTravelPolicyDto,
      },
      family: {
        url: '/traveltest/api/FamilyBooking',
        validator: CreateFamilyPolicyDto,
      },
    },
  },
};
