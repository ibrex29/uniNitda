import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, Matches, Length } from 'class-validator';
import { RelationshipEnum } from './types/relationships.enum';

export class NextOfKinDto {
  @IsString()
  @IsNotEmpty()
  FullName: string;

  @IsString()
  @IsNotEmpty()
  Address: string;

  @IsEnum(RelationshipEnum, {
    message:
      'Relationship must be one of: Parent, Sibling, Spouse, Child, Guardian',
  })
  @IsNotEmpty()
  Relationship: RelationshipEnum;

  @ApiProperty({ example: '09012345678' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'Telephone must be exactly 11 digits' })
  @Matches(/^0\d{10}$/, {
    message: 'Telephone must start with 0 and be 11 digits long',
  })
  Telephone: string;
}
