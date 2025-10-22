import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, Min, MinLength } from "class-validator";

export class loginAuthDto {

    @ApiProperty({description: 'Ingrese un email valido', default: 'juan@mail.com', example: 'juan@mai.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @MinLength(6)
    @MaxLength(30)
    @IsNotEmpty()
    password: string;
}