/* eslint-disable prettier/prettier */

import { Role } from "@prisma/client";
export class User {
  readonly id?: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role?: Role;
}

