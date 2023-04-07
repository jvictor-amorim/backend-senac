/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/models/role.enum';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { CreateMailDto } from './dto/create-mail.dto';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('secret')
  createAdm(@Body() createUserDto: CreateAdminDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/monitoring/:courseId')
  monitoring(@Param('courseId') courseId: string) {
    return this.userService.monitoring(courseId);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/secret/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/secret_user_token')
  findByUserToken(@Req() request: Request) {
    const headers = request.headers;
    return this.userService.findByUserToken(headers);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('secret/:id')
  updateAdm(@Param('id') id: string, @Body() updateUserDto: UpdateAdminDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('secret/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('/mail')
  send_email(@Body() emailDto: CreateMailDto) {
    return this.userService.mail(emailDto);
  }
}
