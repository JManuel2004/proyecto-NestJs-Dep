import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, TasksModule, ProjectsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
