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
