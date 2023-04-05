import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
const jwt = require('jsonwebtoken');

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService){}
  async create(createJobDto: CreateJobDto) {
    const course = await this.prisma.courses.findUnique({where:{id: createJobDto.courseId}});
    const job = {
      ...createJobDto, courseId: course.id
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

  async findByIdUser(id: string) {
    const finds = await this.prisma.user.findUnique({where: {id}});
    return finds;
  }

  async myUser (token: string) {
    try{
      const userId = jwt.verify(token, process.env.JWT_SECRET, function(err: any, decoded: any) {
          const userId = decoded.sub
          return userId
      });
      return await this.prisma.user.findUnique({where: {id: userId}, select:
        {id: true}
      })
    } catch (error) {
       console.log(error)
    }
  }

  async create_user_job(id_user: string, id_job: string, token: string) {
    const job = await this.findOne(id_job)
    const user = await this.findByIdUser(id_user)

    let info_user = await this.findByIdUser(token).then((res) => {
      if(res['data']['type'] === 'success') return res['data']['data'].id
    }).catch((error)=> {
       throw new HttpException('User not found', 404)
    })

    return this.prisma.userJobs.create(
      {
        data: {userId: user.id, jobsId: job.id},
      }
    )
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
