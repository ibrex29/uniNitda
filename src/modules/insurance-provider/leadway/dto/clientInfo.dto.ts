import { IsString, IsNotEmpty, IsEmail, IsIn, IsDateString } from "class-validator";

export class ClientInfoDTO {
    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    othernames: string;

    @IsEmail()
    @IsNotEmpty()
    emailAddress: string;
 
    @IsNotEmpty()
    mobileNo: string;

    @IsIn(['Male', 'Female'])
    @IsNotEmpty()
    gender: string;

    @IsDateString()
    @IsNotEmpty()
    dob_mm_dd_yyyy: string;

    @IsString()
    @IsNotEmpty()
    postalAddress: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;
}