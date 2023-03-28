import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService){}
  async create(createJobDto: CreateJobDto) {
    const curso = await this.prisma.courses.findUnique({where:{id: createJobDto.courseId}});
    const job = {
      ...createJobDto, courseId: curso.id
    }

    const data = new Date();

    const br = new Date(data.setHours(data.getHours() - 3));

    const created = await this.prisma.jobs.create(
      {
        data: {...job, published: br, description: job.descripion},
      }
    );

    return created;
    
  }

  async findAll() {
    try{
    return await this.prisma.jobs.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.jobs.findUnique({
        where: {
          id: id,
        }
      });
    } catch (error) {
      console.log(error);
    }
}

  async findByCourse(courseId: string) {
    try {
      return await this.prisma.jobs.findMany({
        where: {
          courseId: courseId,
        }
      });
    } catch (error) {
      console.log(error);
    }
}

  async update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  async remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
