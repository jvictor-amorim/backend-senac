import { PartialType } from '@nestjs/mapped-types';
import { CreateSenacDto } from './create-senac.dto';

export class UpdateSenacDto extends PartialType(CreateSenacDto) {}