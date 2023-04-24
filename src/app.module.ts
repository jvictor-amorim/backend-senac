/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { JobsModule } from './jobs/jobs.module';
import { CoursesModule } from './courses/courses.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, JobsModule, CoursesModule, MulterModule.register({
    dest: './uploads',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
