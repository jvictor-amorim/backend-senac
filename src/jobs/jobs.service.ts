import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService){}
  async create(createJobDto: CreateJobDto) {
    const job = {
      ...createJobDto,
    }

    return await this.prisma.jobs.create(
      {
        data: {...job, enterprise: '', owner: '', published: '', active: true, quantity: 1, place: '', description: 'descricao'},
      }
    );
  }

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
