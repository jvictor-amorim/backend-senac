import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/models/role.enum';
import { CreateUserJobDto } from './dto/create-user-job.dto';

@ApiTags('Vagas')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiBearerAuth()
  @Roles(Role.ENTERPRISE, Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.jobsService.findByCourse(courseId);
  }

  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/courseName/:courseName')
  findByCourseName(@Param('courseName') courseName: string) {
    return this.jobsService.findByName(courseName);
  }

  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ENTERPRISE, Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ENTERPRISE, Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/create_user_job')
  create_user_job(@Body() userJobDto: CreateUserJobDto) {
    console.log(userJobDto)
    return this.jobsService.create_user_job(userJobDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ENTERPRISE, Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/job_user/:jobId')
  findByUserJob(@Param('jobId') jobId: string) {
    return this.jobsService.findByUserJob(jobId);
  }
}
