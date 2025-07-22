import { IsNotEmpty, IsOptional, IsString, IsArray, IsBoolean, IsNumber } from "class-validator";
import { ClientInfoDTO } from "./clientInfo.dto";

export class VehicleDTO {
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
    @IsNumber()
    manuYear: number;

    @IsNotEmpty()
    @IsNumber()
    value: number;

    @IsNotEmpty()
    @IsBoolean()
    commercial: boolean;
}
export class CreateVehiclePolicyDTO {
    @IsNotEmpty()
    clientInfo: ClientInfoDTO;

    @IsArray()
    @IsNotEmpty()
    vehicle: VehicleDTO[];
}
