/* eslint-disable prettier/prettier */

import { Role } from "@prisma/client";
export class User {
  readonly id?: string;
  email: string;
  password: string;
  firstname: string;
  lastname?: string;
  cpf: string;
  adress: string;
  vagas: boolean;
  shared: boolean;
  published: boolean;
  role?: Role;
}

