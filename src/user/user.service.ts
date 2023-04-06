/* eslint-disable prettier/prettier */
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
const nodemailer = require("nodemailer");
//const SMTP_CONFIG = require("../../config/smtp");
import { SMTP_CONFIG } from '../../config/smtp'
import { CreateMailDto } from './dto/create-mail.dto';

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
        data: {...user, cnpj: '', status: user.status},
      }
      );
    
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async transporter (){ 
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }
  
  async mail(emailDto: CreateMailDto){
    const course = await this.prisma.courses.findMany({
      where: {
        id: emailDto.courseId,
      }
    })
    const user = await this.monitoring(course[0].id)
    const emails = user.map((el) => el.email)

    const transporter_mail = await this.transporter();
    try {
      const mailOptions = {
        text: emailDto.text,
        from: 'Senac(NÃO RESPONDA!) <' + process.env.MAIL_SENAC,
        to: emails,
        subject: emailDto.subject,
      };
      transporter_mail.sendMail(mailOptions, (err: any, info: any) => {});
    } catch (error) {
      console.log("Error in send email: " + error)
    }
  }

  async monitoring(courseId: string) {
    try {
      return await this.prisma.user.findMany({
        where: {
          status: true,
          courseId: courseId
        },
        select: {name: true, email: true, phone: true, address: true, cpf: true}
      });
    } catch (error) {
      console.log(error);
    }
  }

  // async createAdm(createUserDto: CreateAdminDto) {
  //   const user = {
  //     ...createUserDto,
  //     password: await bcrypt.hash(createUserDto.password, 10),
  //   }

  //   const createdUser = await this.prisma.user.create(
  //     {
  //       data: {...user,},
  //     }
  //     );
    
  //   return {
  //     ...createdUser,
  //     password: undefined,
  //   };
  // }

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

  async findById(id: string) {
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
      name: true,
    }
    });
    
    return {
      ...finds,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    
    const attUser = await this.prisma.user.update({
      where: {id: user.id},
      data: updateUserDto,
    })
    return attUser;
  }

  async updateAdmin(id: string, updateUserDto: UpdateAdminDto) {
    const user = await this.findById(id);
    
    const attUser = await this.prisma.user.update({
      where: {id: user.id},
      data: updateUserDto,
    })
    return attUser;
  }

  async remove(id: string) {
    
    const user = await this.findById(id);

    await this.prisma.user.delete({
      where: {
        id: user.id,
      }
    })
    
    return `${user.name} foi removido do sistema!`;
  }
}
