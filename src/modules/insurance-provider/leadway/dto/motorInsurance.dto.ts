import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsInt, IsPositive, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ClientInfoDTO } from './clientInfo.dto';

class VehicleDTO {
    @IsNotEmpty()
    @IsString()
    registrationNo: string;

    @IsNotEmpty()
    @IsString()
    make_id: string;

    @IsNotEmpty()
    @IsString()
    model_id: string;

    @IsNotEmpty()
    @IsString()
    chassisNo: string;

    @IsNotEmpty()
    @IsString()
    engineNo: string;

    @IsNotEmpty()
    @IsString()
    bodyType: string;

    @IsNotEmpty()
    @IsString()
    colour: string;

    @IsNotEmpty()
    @IsInt()
    manuYear: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    value: number;
}

export class MotorInsuranceDTO {
    @ValidateNested()
    @Type(() => ClientInfoDTO)
    @IsNotEmpty()
    clientInfo: ClientInfoDTO;

    @ValidateNested({ each: true })
    @Type(() => VehicleDTO)
    @IsArray()
    @IsNotEmpty()
    vehicle: VehicleDTO[];
}
