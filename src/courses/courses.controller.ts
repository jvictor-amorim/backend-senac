import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/auth/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Cursos')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
  
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('userCourses')
  userCourseList() {
    return this.coursesService.userCourseList();
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SENAC)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

}
