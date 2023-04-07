import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateUserJobDto } from './dto/create-user-job.dto';


@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService, private readonly userService: UserService){}
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

  async create_user_job(userJobDto: CreateUserJobDto) {
    const job = await this.findOne(userJobDto.id_job)
    const user = await this.userService.findByUserToken({'authorization': userJobDto.token})

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

  async findByUserJob(jobId: string) {
    try {
      const user_ids = await this.prisma.userJobs.findMany({
        where: {
          jobsId: jobId
        },
        select: {
          userId: true
        }
      });

      let data = []
      for (const id of user_ids) {
        const user_Data = await this.userService.findById(id.userId)
        const course_data = await this.prisma.courses.findUnique({
          where: {
            id: user_Data.courseId
          }
        })
        data.push({
          "name": user_Data.name,
          "course_name": course_data.name,
          "email": user_Data.email,
          "phone": user_Data.phone,
          "address": user_Data.address,  
        })
      }
      return data
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
