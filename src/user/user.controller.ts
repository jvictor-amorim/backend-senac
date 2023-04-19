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
import { CreateSenacDto } from './dto/create-senac.dto';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { UpdateSenacDto } from './dto/update-senac.dto';

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
  @Post('/senac')
  createSenac(@Body() createUserDto: CreateSenacDto) {
    return this.userService.createSenac(createUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/recoverPasswords/:email')
  recoverPasswords(@Param('email') email: string) {
    return this.userService.recoverPassword(email);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/enterprise')
  createEnterprise(@Body() createUserDto: CreateEnterpriseDto) {
    return this.userService.createEnterprise(createUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/secret')
  createAdm(@Body() createUserDto: CreateAdminDto) {
    return this.userService.createAdm(createUserDto);
  }

  @Get('/monitoring/:courseId')
  monitoring(@Param('courseId') courseId: string) {
    return this.userService.monitoring(courseId);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/student')
  findAllStudent() {
    return this.userService.findAllStudent();
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/enterprise')
  findAllEnterprise() {
    return this.userService.findAllEnterprise();
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
  @Patch('/updateStudent')
  updateStudent(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const headers = request.headers;
    return this.userService.updateStudent(headers, updateUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.ENTERPRISE)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('/updateEnterprise')
  updateEnterprise(@Req() request: Request, @Body() updateUserDto: UpdateEnterpriseDto) {
    const headers = request.headers;
    return this.userService.updateEnterprise(headers, updateUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('/updateSenac')
  updateSenac(@Req() request: Request, @Body() updateUserDto: UpdateSenacDto) {
    const headers = request.headers;
    return this.userService.updateSenac(headers, updateUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('/updateAdmin')
  updateAdm(@Req() request: Request, @Body() updateUserDto: UpdateAdminDto) {
    const headers = request.headers;
    return this.userService.updateAdm(headers, updateUserDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('secret/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/mail')
  send_email(@Body() emailDto: CreateMailDto) {
    return this.userService.mail(emailDto);
  }
}
