import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateUserJobDto {
    @ApiProperty({ example: '20b74864-640e-40b7-81ab-d76698893cf8' })
    @IsString()
    id_job: string;

    @ApiProperty({ example: '' })
    @IsString()
    token: string;
}
