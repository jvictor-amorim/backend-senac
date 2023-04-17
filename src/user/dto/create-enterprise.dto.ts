import { Role } from '@prisma/client';
import {User} from '../entities/user.entity'

export class CreateEnterpriseDto extends User {
  email: string;
  password: string;
  name: string;
  cnpj: string;
  phone: string;
  role: Role;
}