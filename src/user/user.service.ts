/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/models/role.enum';
import { PrismaService } from './../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateMailDto } from './dto/create-mail.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { CreateSenacDto } from './dto/create-senac.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { UpdateSenacDto } from './dto/update-senac.dto';
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

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

  async recoverPassword(userId: string){
    const user = await this.findById(userId)
    const password = this.generatePasswordTemp('8')
    user["password"] = await bcrypt.hash(password, 10),
    
    await this.prisma.user.update({
      where: {id: user.id},
      data: user
    })

    const transporter_mail = await this.transporter();
    try {
      const mailOptions = {
        text: `Sua senha temporaria é: ${password}`,
        from: 'Senac(NÃO RESPONDA!) <' + process.env.MAIL_SENAC,
        to: user.email,
        subject: 'Recuperação de senha!',
      };
      transporter_mail.sendMail(mailOptions, (err: any, info: any) => {});
    } catch (error) {
      console.log("Error in send email: " + error)
    }
    return `Uma senha temporaria foi enviada para o seu email!`
  }

  generatePasswordTemp(amount: string) {
    var tempPassword = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < Number(amount); i++) {
      tempPassword += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return tempPassword;
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

  async createAdm(createUserDto: CreateAdminDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.prisma.user.create(
      {
        data: {...user, role: Role.ADMIN, cnpj: ''},
      }
      );
    
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async createEnterprise(createUserDto: CreateEnterpriseDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.prisma.user.create(
      {
        data: {...user, role: Role.ENTERPRISE, cpf: ''},
      }
      );
    
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async createSenac(createUserDto: CreateSenacDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.prisma.user.create(
      {
        data: {...user, role: Role.SENAC, cnpj: ''},
      }
      );
    
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll() {
    const finds = await this.prisma.user.findMany();

    for (const item of finds) {
      const course = await this.prisma.courses.findUnique({
          where: {
            id: item.courseId
          }
        })
        item["course_name"] = course.name
    }
    const findss = finds.map((item) => ({
      ...item,
      password: undefined,
    }));
    
    return findss;
  }

  async findAllStudent() {
    const finds = await this.prisma.user.findMany({
      where: {
        role: 'USER'
      }
    });

    const findss = finds.map((item) => ({
      ...item,
      password: undefined,
    }));
    
    return findss;
  }

  async findAllEnterprise() {
    const finds = await this.prisma.user.findMany({
      where: {
        role: 'ENTERPRISE'
      }
    });

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

  async myUser (token: string) {
    try{
      const userId = jwt.verify(token, process.env.JWT_SECRET, function(err: any, decoded: any) {
          const userId = decoded.sub
          return userId
      });
      return await this.prisma.user.findUnique({where: {id: userId}, select:
        {id: true, name: true, email: true, cpf: true, cnpj: true, address: true, phone: true, status: true, role: true, courseId: true}
      })
    } catch (error) {
       console.log(error)
    }
  }

  async findByUserToken(headers: {}) {
    if(headers["authorization"].includes('Bearer')) return await this.myUser(headers["authorization"].split("Bearer ")[1].trim())
    return await this.myUser(headers["authorization"].trim())

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

  async updateAdm(id: string, updateAdminDto: UpdateAdminDto) {
    const user = await this.findById(id);
    
    const attUser = await this.prisma.user.update({
      where: {id: user.id},
      data: updateAdminDto,
    })
    return attUser;
  }

  async updateEnterprise(id: string, updateUserDto: UpdateEnterpriseDto) {
    const user = await this.findById(id);
    
    const attUser = await this.prisma.user.update({
      where: {id: user.id},
      data: updateUserDto,
    })
    return attUser;
  }

  async updateSenac(id: string, updateUserDto: UpdateSenacDto) {
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