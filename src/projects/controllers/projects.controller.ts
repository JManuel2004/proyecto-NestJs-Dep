import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../users/entities/user.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Auth()
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @GetUser() user: User) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Auth()
  @Get()
  findAll(@GetUser() user: User) {
    return this.projectsService.findAll(user);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.projectsService.findOne(id, user);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
  ) {
    return this.projectsService.update(id, updateProjectDto, user);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.projectsService.remove(id, user);
  }
}
