import { ApiProperty } from "@nestjs/swagger";
import { Course } from "../entities/course.entity";
import { IsString } from "class-validator";

export class CreateCourseDto extends Course{
    @ApiProperty({ example: 'Jogos Digitais' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Graduação' })
    @IsString()
    level: string;

    @ApiProperty({ example: 'EAD' })
    @IsString()
    modality: string;

    @ApiProperty({ example: '4 anos' })
    @IsString()
    duration: string;

    @ApiProperty({ example: 'Curso de bacharelado em Jogos Digitais' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'Ciências exatas e tecnologia' })
    @IsString()
    area: string;
}
