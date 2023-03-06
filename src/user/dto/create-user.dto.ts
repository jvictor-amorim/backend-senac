/* eslint-disable prettier/prettier */

import {User} from '../entities/user.entity'

import {IsEmail, IsString, MinLength, MaxLength, Matches} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends User {
  @ApiProperty({example: 'user@example.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'User001'})
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  firstname: string;
  
  @IsString()
  lastname: string;

}
