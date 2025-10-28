import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../users/entities/user.entity';

@ApiTags('Projects')
@ApiBearerAuth('bearer')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Auth()
  @Post()
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 201, description: 'Proyecto creado' })
  create(@Body() createProjectDto: CreateProjectDto, @GetUser() user: User) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Auth()
  @Get()
  @ApiResponse({ status: 200, description: 'Listado de proyectos del usuario' })
  findAll(@GetUser() user: User) {
    return this.projectsService.findAll(user);
  }

  @Auth()
  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Detalle de proyecto' })
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.projectsService.findOne(id, user);
  }

  @Auth()
  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
  ) {
    return this.projectsService.update(id, updateProjectDto, user);
  }

  @Auth()
  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado' })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.projectsService.remove(id, user);
  }
}
