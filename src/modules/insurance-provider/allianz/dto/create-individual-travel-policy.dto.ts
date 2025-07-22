import { IsString, IsInt, IsEmail, IsDateString, IsBoolean, IsOptional, IsNotEmpty, Length, Matches } from 'class-validator';
import { NextOfKinDto } from './next-of-kin.dto.ts';

export class CreateIndividualTravelPolicyDto {
  @IsInt()
  QuoteId: number;

  @IsString()
  @IsNotEmpty()
  Surname: string;

  @IsString()
  @IsOptional()
  MiddleName: string;

  @IsString()
  @IsNotEmpty()
  FirstName: string;

  @IsInt()
  @IsOptional()
  GenderId: number;

  @IsInt()
  @IsOptional()
  TitleId: number;

  @IsDateString()
  @IsNotEmpty()
  DateOfBirth: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'Telephone must be exactly 11 digits' })
  @Matches(/^0\d{10}$/, { message: 'Telephone must start with 0 and be 11 digits long' })
  Telephone: string;

  @IsInt()
  @IsOptional()
  StateId: number;

  @IsString()
  @IsNotEmpty()
  Address: string;

  @IsString()
  @IsOptional()
  ZipCode: string;

  @IsString()
  @IsOptional()
  Nationality: string;

  @IsString()
  @IsNotEmpty()
  PassportNo: string;

  @IsString()
  @IsOptional()
  IdentificationPath: string;

  @IsString()
  @IsOptional()
  Occupation: string;

  @IsInt()
  @IsOptional()
  MaritalStatusId: number;

  @IsBoolean()
  @IsOptional()
  PreExistingMedicalCondition: boolean;

  @IsString()
  @IsOptional()
  MedicalCondition: string;

  @IsNotEmpty()
  NextOfKin: NextOfKinDto;
}
