import { IsString, IsEmail, IsNotEmpty, IsIn, IsPositive, IsOptional, IsDateString } from 'class-validator';
import { ClientInfoDTO } from './clientInfo.dto';

export class quoteHealthDTO {
    @IsOptional()
    @IsString()
    productSubClass: string;

    @IsOptional()
    @IsString()
    productCode: string;
   
    @IsNotEmpty()
    clientInfo: ClientInfoDTO;
}