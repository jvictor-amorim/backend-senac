import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/models/role.enum';

@ApiTags('Vagas')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // @ApiBearerAuth()
  // @Roles(Role.ENTERPRISE)
  // @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  // @ApiBearerAuth()
  // @Roles(Role.ENTERPRISE)
  // @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

   @ApiBearerAuth()
   @Roles(Role.SENAC)
   @UseGuards(JwtGuard, RolesGuard)
  @Get('/course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.jobsService.findByCourse(courseId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
