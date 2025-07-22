import { IsDateString, IsEmail, IsInt, IsBoolean, IsString, IsNotEmpty, ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint, Validate, IsOptional } from 'class-validator';

@ValidatorConstraint({ name: 'isCoverEndAfterCoverBegin', async: false })
class IsCoverEndAfterCoverBegin implements ValidatorConstraintInterface {
    validate(coverEnds: string, args: ValidationArguments) {
        const coverBegins = (args.object as any).CoverBegins;
        return new Date(coverEnds) > new Date(coverBegins);
    }

    defaultMessage(_args: ValidationArguments) {
        return 'CoverEnds must be later than CoverBegins';
    }
}

export class GetIndividualTravelQuotationDto {
    @IsNotEmpty()
    @IsDateString()
    DateOfBirth: string;

    @IsEmail()
    @IsNotEmpty()
    Email: string;

    @IsString()
    @IsNotEmpty()
    Telephone: string;

    @IsString()
    @IsNotEmpty()
    CoverBegins: string;
  
    @IsString()
    @IsNotEmpty()
    @Validate(IsCoverEndAfterCoverBegin)
    CoverEnds: string;

    @IsInt()
    @IsNotEmpty()
    CountryId: number;

    @IsString()
    @IsOptional()
    PurposeOfTravel: string;

    @IsInt()
    @IsNotEmpty()
    TravelPlanId: number;

    @IsBoolean()
    @IsOptional()
    IsRoundTrip: boolean;

}

