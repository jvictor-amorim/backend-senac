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
        data: {...job, published: br, description: job.description},
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
    const jobs = await this.prisma.jobs.findMany();
    for (const item of jobs) {
      const course = await this.prisma.courses.findUnique({
          where: {
            id: item.courseId
          }
        })
        item["course_name"] = course.name
      }
      return jobs
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
      const find = await this.prisma.jobs.findMany({
        where: {
          courseId,
        }, orderBy: {
          published: 'desc'
        }
      });
      return find;
    } catch (error) {
      console.log(error);
    }
  }

  async findByCourseName(courseName: string) {
    try { 
      let data = [];
      const find = await this.prisma.courses.findMany({
        where: {
          name: {contains: courseName, mode: 'insensitive'},
        }, orderBy: {
          name: 'asc'
        }
      });
      find.map(async (item) => {
        this.findByCourse(item.id)
        data.push(item);
      })
      return data;
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
  
  async update(id: string, updateJobDto: UpdateJobDto) {
    const jobs = await this.findOne(id);
    
    const attJobs = await this.prisma.jobs.update({
      where: {id: jobs.id},
      data: updateJobDto,
    })

    return attJobs;
  }

  async remove(id: string) {
    const jobs = await this.findOne(id);

    await this.prisma.jobs.delete({
      where: {
        id: jobs.id,
      }
    })
    
    return `Uma vaga foi removida do sistema!`;
  }
}
