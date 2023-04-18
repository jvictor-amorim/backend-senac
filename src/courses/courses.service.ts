import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCourseDto: CreateCourseDto) {
    const created = await this.prisma.courses.create(
      {
        data: {...createCourseDto}
      } 
    );

    return created;
  }

  findAll() {
    try{
      return this.prisma.courses.findMany();
    }catch(e){
      console.log(e)
    }
  }

  async findOne(id: string) {
    try{
      return await this.prisma.courses.findUnique({
        where: {
          id: id
        }
    })
    }catch(e){
      console.log(e)
    }
  }

  async userCourseList() {
    try{
      let data = []
      const courses = await this.findAll();

      for (const course of courses) {
        const countUserCourses = await this.prisma.user.findMany({
          where: {
            courseId: course.id
          }
        })
        data.push({
          "name": course.name,
          "amount": countUserCourses.length
        })
      }

      data = data.sort((a, b) => {
        if (a.name < b.name)
          return -1;
          if (a.name > b.name)
            return 1;
          return 0;
      });
      return data
    }catch(e){
      console.log(e)
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try{
      const course = await this.findOne(id)

      return await this.prisma.courses.update({
        where: {id: course.id},
        data: updateCourseDto,
      })

    }catch(e){
      console.log(e)
    }
  }

  async remove(id: string) {
    const course = await this.findOne(id);
      await this.prisma.courses.delete({
        where: {
          id: course.id,
        }
      })
    return `${course.name} foi removido do sistema!`;
  }

 
  
}
