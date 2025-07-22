// create-company.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'The name of the company',
    example: 'Tech Innovations Ltd.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the company',
    example: 'info@techinnovations.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'The phone number of the company',
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: 'The address of the company',
    example: '123 Tech Avenue, Silicon Valley',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The state where the company is located',
    example: 'Kano',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({
    description: 'The country where the company is located',
    example: 'Nigeria',
    default: 'Nigeria',
  })
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'The ID of the employee to be added to the company (required for admin users)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsString()
  employeeId: string;  
  }
