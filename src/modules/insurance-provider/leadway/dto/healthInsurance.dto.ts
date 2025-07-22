import { IsOptional, IsString, IsNotEmpty } from "class-validator";
import { ClientInfoDTO } from "./clientInfo.dto";

export class HealthInsuranceDTO {
    @IsOptional()
    @IsString()
    productSubClass: string;

    @IsOptional()
    @IsString()
    productCode: string;

    @IsNotEmpty()
    clientInfo: ClientInfoDTO;
}
