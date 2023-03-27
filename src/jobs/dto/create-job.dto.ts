import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Job } from "../entities/job.entity";

export class CreateJobDto extends Job {
    @ApiProperty({ example: 'nome da empresa' })
    @IsString()
    enterprise: string;

    @ApiProperty({ example: 'nome da vaga' })
    @IsString()
    owner: string;

    @ApiProperty({ example: 'descrição da vaga' })
    @IsString()
    descripion: string;

    @ApiProperty({ example: 'nome da empresa' })
    published: Date;

    @ApiProperty({ example: true })
    @IsBoolean()
    active: boolean;

    @ApiProperty({ example: 12 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ example: 'descrição da vaga' })
    @IsString()
    place: string;

}
