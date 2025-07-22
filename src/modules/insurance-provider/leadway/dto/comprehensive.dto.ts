import { IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";
import { VehicleDTO } from "./autoBaseMotor.dto";
import { ClientInfoDTO } from "./clientInfo.dto";

export class MotorInsuranceComprehensiveDTO {
    @IsNotEmpty()
    @IsString()
    productSubClass: string;

    @IsNotEmpty()
    @IsString()
    productCode: string;

    @IsNotEmpty()
    clientInfo: ClientInfoDTO;

    @IsArray()
    @IsNotEmpty()
    vehicle: VehicleDTO[];

}