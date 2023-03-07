/* eslint-disable prettier/prettier */

import {User} from '../entities/user.entity'

import {IsEmail, IsString, MinLength, MaxLength, Matches, IsBoolean} from 'class-validator'
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

  @ApiProperty({example: 'João da Silva Sauros'})
  @IsString()
  firstname: string;
  
  @ApiProperty({example: '19909882712'})
  @IsString()
  cpf: string;

  @ApiProperty({example: 'Rua dos bobos, 0'})
  @IsString()
  adress: string;

  @ApiProperty({example: true})
  @IsBoolean()
  vagas: boolean;

  @ApiProperty({example: true})
  @IsBoolean()
  shared: boolean;

  @ApiProperty({example: true})
  @IsBoolean()
  published: boolean;

}
