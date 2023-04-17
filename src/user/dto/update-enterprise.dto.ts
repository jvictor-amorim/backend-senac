import { PartialType } from '@nestjs/mapped-types';
import { CreateEnterpriseDto } from './create-enterprise.dto';

export class UpdateUserDto extends PartialType(CreateEnterpriseDto) {}