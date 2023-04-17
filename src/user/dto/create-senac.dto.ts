import { Role } from '@prisma/client';
import {User} from '../entities/user.entity'

export class CreateSenacDto extends User {
  email: string;
  password: string;
  name: string;
  cpf: string;
  phone: string;
  role: Role;
}