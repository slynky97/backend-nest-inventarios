import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({nullable: false, required: true})
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(200)
    @IsNotEmpty()
    password: string;

}
