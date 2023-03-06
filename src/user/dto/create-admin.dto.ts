/* eslint-disable prettier/prettier */

import { Role } from '@prisma/client';
import {User} from '../entities/user.entity'

export interface CreateAdminDto extends User {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: Role;

}