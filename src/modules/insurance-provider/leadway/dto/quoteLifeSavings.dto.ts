import { IsString, IsEmail, IsNotEmpty, IsIn, IsPositive, IsOptional, IsDateString } from 'class-validator';
import { ClientInfoDTO } from './clientInfo.dto';

export class LifeInsuranceDTO {
    @IsNotEmpty()
    clientInfo: ClientInfoDTO;

    @IsNotEmpty()
    frequency: string;

    @IsPositive()
    @IsNotEmpty()
    duration: number;

    @IsPositive()
    @IsNotEmpty()
    sumAssured: number;

    @IsPositive()
    @IsNotEmpty()
    criticalIllnessCover: number;

    @IsPositive()
    @IsNotEmpty()
    permanentDisability: number;

    @IsPositive()
    @IsNotEmpty()
    lifeCover: number;
}
