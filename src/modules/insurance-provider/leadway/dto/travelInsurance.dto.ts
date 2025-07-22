import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ClientInfoDTO } from './clientInfo.dto';

export class TravelInsuranceDTO {
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  clientInfo: ClientInfoDTO;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsDateString()
  depaturedate: string;

  @IsNotEmpty()
  @IsDateString()
  arrivaldate: string;

  @IsNotEmpty()
  @IsString()
  passportNo: string;
}
