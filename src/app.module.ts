import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  
    
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
    }),

    UsersModule,
    TasksModule,
    ProjectsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {
  constructor() {
    console.log('DATABASE_URL =>', JSON.stringify(process.env.DATABASE_URL));
    console.log('PG* env =>', {
      PGUSER: process.env.PGUSER,
      PGPASSWORD: process.env.PGPASSWORD,
    });
  }

}
