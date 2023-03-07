/* eslint-disable prettier/prettier */

import { Role } from '@prisma/client';
import {User} from '../entities/user.entity'

export interface CreateAdminDto extends User {
  email: string;
  password: string;
  firstname: string;
  cpf: string;
  adress: string;
  vagas: boolean;
  shared: boolean;
  published: boolean;
  role: Role;

}