/* eslint-disable prettier/prettier */
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.prisma.user.create(
      {
        data: user,
      }
      );
    
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async createAdm(createUserDto: CreateAdminDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.prisma.user.create(
      {
        data: user,
      }
      );
    
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll() {
    const finds = await this.prisma.user.findMany();

    const findss = finds.map((item) => ({
      ...item,
      password: undefined,
    }));
    
    return findss;
  }

  async findByEmails(email: string) {
    const finds = await this.prisma.user.findUnique({where: {email}});
    
    return finds;
  }

  async findById(id: number) {
    const finds = await this.prisma.user.findUnique({where: {id}});
    
    return finds;
  }

  async findByEmail(email: string) {
    const finds = await this.prisma.user.findUnique({
      where: {
       email
    },
    select: {
      email:true,
      firstname: true,
      lastname:true
    }
    });
    
    return {
      ...finds,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    
    const attUser = await this.prisma.user.update({
      where: {id: user.id},
      data: updateUserDto,
    })
    return attUser;
  }

  async updateAdmin(id: number, updateUserDto: UpdateAdminDto) {
    const user = await this.findById(id);
    
    const attUser = await this.prisma.user.update({
      where: {id: user.id},
      data: updateUserDto,
    })
    return attUser;
  }

  async remove(id: number) {
    
    const user = await this.findById(id);

    await this.prisma.user.delete({
      where: {
        id: user.id,
      }
    })
    
    return `${user.firstname} ${user.lastname} foi removido do sistema!`;
  }
}
