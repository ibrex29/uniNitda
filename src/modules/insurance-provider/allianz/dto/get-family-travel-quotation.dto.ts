import { IsDateString, IsEmail, IsInt, IsBoolean, IsString, Min, Max, ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint, Validate, IsNotEmpty, IsOptional, Matches, Length } from 'class-validator';

@ValidatorConstraint({ name: 'IsCoverEndAfterCoverBegin', async: false })
export class IsCoverEndAfterCoverBegin implements ValidatorConstraintInterface {
    validate(coverEnds: string, args: ValidationArguments) {
        const coverBegins = (args.object as any).CoverBegins;
        return new Date(coverEnds) > new Date(coverBegins);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Cover end date must be after cover begin date';
    }
}

export class GetFamilyTravelQuotationDto {
    @IsNotEmpty()
    @IsDateString()
    DateOfBirth: string;

    @IsEmail()
    @IsNotEmpty()
    Email: string;

    @IsString()
    @IsNotEmpty()
    @Length(11, 11, { message: 'Telephone must be exactly 11 digits' })
    @Matches(/^0\d{10}$/, { message: 'Telephone must start with 0 and be 11 digits long' })
    Telephone: string;

    @IsDateString()
    @IsNotEmpty()
    CoverBegins: string;
  
    @IsDateString()
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

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(6)
    NoOfChildren: number;
    }
