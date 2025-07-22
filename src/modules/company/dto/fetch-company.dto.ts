import { ApiProperty } from '@nestjs/swagger';
import { FetchDTO } from '@/common/dto';
import { IsEnum, IsOptional } from 'class-validator';

enum CompanySortFieldEnum {
  createdAt = 'createdAt',
}

export class FetchCompaniesDTO extends FetchDTO {
  @ApiProperty({ enum: CompanySortFieldEnum, required: false, description: 'Field to sort by' })
  @IsEnum(CompanySortFieldEnum)
  @IsOptional()
  readonly sortField?: CompanySortFieldEnum;
}
