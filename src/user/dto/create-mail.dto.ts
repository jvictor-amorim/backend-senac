import {IsString} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateMailDto  {
  @ApiProperty({example: '3fb2818b-bc43-4f34-ba31-8f96a5ab8372'})
  @IsString()
  courseId: string;

  @ApiProperty({example: 'Assunto do email'})
  @IsString()
  subject: string;

  @ApiProperty({example: 'Conteudo do email'})
  @IsString()
  text: string;

}
