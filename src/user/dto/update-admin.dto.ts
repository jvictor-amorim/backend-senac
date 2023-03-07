/* eslint-disable prettier/prettier */
import { CreateAdminDto } from './create-admin.dto';
import { Role } from '@prisma/client';

export interface UpdateAdminDto extends CreateAdminDto {
  email: string;
  password: string;
  firstname: string;
  role: Role;
}