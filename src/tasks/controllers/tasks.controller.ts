import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../users/entities/user.entity';

@ApiTags('Tasks')
@ApiBearerAuth('bearer')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Auth()
  @Post()
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Tarea creada' })
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Auth()
  @Get()
  @ApiResponse({ status: 200, description: 'Listado de tareas del usuario' })
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @Auth()
  @Get('project/:projectId')
  @ApiParam({ name: 'projectId', type: String })
  @ApiResponse({ status: 200, description: 'Tareas del proyecto' })
  findByProject(@Param('projectId') projectId: string, @GetUser() user: User) {
    return this.tasksService.findByProject(projectId, user);
  }

  @Auth()
  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Detalle de tarea' })
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.findOne(id, user);
  }

  @Auth()
  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Tarea actualizada' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Auth()
  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Tarea eliminada' })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.remove(id, user);
  }
}
