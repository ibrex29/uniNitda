import {
  IsString,
  IsInt,
  IsEmail,
  IsDateString,
  IsBoolean,
  IsOptional,
  Min,
  Max,
  ValidateNested,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NextOfKinDto } from './next-of-kin.dto.ts.js';

export class CreatePolicyDto {
  @ApiProperty({ example: 31727 })
  @IsInt()
  QuoteId: number;

  @ApiProperty({ example: 'Adams' })
  @IsString()
  Surname: string;

  @ApiPropertyOptional({ example: 'Musa' })
  @IsOptional()
  @IsString()
  MiddleName?: string;

  @ApiProperty({ example: 'Sani' })
  @IsString()
  FirstName: string;

  @ApiProperty({ example: 1, description: '1 = Male, 2 = Female' })
  @IsInt()
  @Min(1)
  @Max(2)
  GenderId: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  TitleId: number;

  @ApiProperty({ example: '2000-02-23' })
  @IsDateString()
  DateOfBirth: string;

  @ApiProperty({ example: 'ibrex29@gmail.com' })
  @IsEmail()
  Email: string;

  @ApiProperty({ example: '09012345678' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'Telephone must be exactly 11 digits' })
  @Matches(/^0\d{10}$/, {
    message: 'Telephone must start with 0 and be 11 digits long',
  })
  Telephone: string;

  @ApiProperty({ example: 14 })
  @IsInt()
  StateId: number;

  @ApiProperty({ example: '7B, Opebi Road, Ikeja, Lagos' })
  @IsString()
  Address: string;

  @ApiProperty({ example: '101233' })
  @IsString()
  ZipCode: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  Nationality: string;

  @ApiPropertyOptional({ example: 'A12345678' })
  @IsOptional()
  @IsString()
  PassportNo?: string;

  @ApiPropertyOptional({ example: 'uploads/identification.pdf' })
  @IsOptional()
  @IsString()
  IdentificationPath?: string;

  @ApiProperty({ example: 'IT Consultant' })
  @IsString()
  Occupation: string;

  @ApiProperty({ example: 1, description: '1 = Single, 2 = Married' })
  @IsInt()
  @Min(1)
  @Max(2)
  MaritalStatusId: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  PreExistingMedicalCondition: boolean;

  @ApiPropertyOptional({ example: 'Asthma' })
  @IsOptional()
  @IsString()
  MedicalCondition?: string;

  @ApiProperty({ type: () => NextOfKinDto })
  @ValidateNested()
  @Type(() => NextOfKinDto)
  NextOfKin: NextOfKinDto;
}

export class CreateFamilyPolicyDto {
  @ApiProperty({ type: CreatePolicyDto })
  @ValidateNested()
  @Type(() => CreatePolicyDto)
  adults: CreatePolicyDto;

  @ApiPropertyOptional({ type: CreatePolicyDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePolicyDto)
  children?: CreatePolicyDto;
}
