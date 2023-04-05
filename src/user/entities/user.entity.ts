/* eslint-disable prettier/prettier */

import { Role } from "@prisma/client";
export class User {
  readonly id?: string;
  email: string;
  password: string;
  name: string;
  cpf: string;
  address: string;
  phone: string;
  courseId: string;
  role?: Role = Role.USER;
}

