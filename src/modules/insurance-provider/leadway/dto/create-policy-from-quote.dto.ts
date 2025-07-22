import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreatePolicyFromQuoteDTO {
    @IsNotEmpty()
    @IsString()
    quoteNo: string;

    @IsOptional()
    @IsString()
    paymentReferenceNo: string;

    @IsNotEmpty()
    @IsBoolean()
    issueCreditNote: boolean;

    @IsOptional()
    @IsString()
    creditNote: string;
}
