import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const project = await this.projectRepository.findOne({
      where: { id: createTaskDto.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${createTaskDto.projectId} no encontrado`);
    }

    if (project.userId !== user.id && user.role !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para agregar tareas a este proyecto');
    }

    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    if (user.role === 'superadmin') {
      return await this.taskRepository.find({
        relations: ['project', 'assignedTo'],
      });
    }

    const userProjects = await this.projectRepository.find({
      where: { userId: user.id },
    });

    const projectIds = userProjects.map((p) => p.id);

    if (projectIds.length === 0) {
      return [];
    }

    return await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('task.assignedTo', 'assignedTo')
      .where('task.projectId IN (:...projectIds)', { projectIds })
      .getMany();
  }

  async findOne(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'assignedTo'],
    });

    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    const project = await this.projectRepository.findOne({
      where: { id: task.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Proyecto asociado no encontrado`);
    }

    if (project.userId !== user.id && user.role !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para ver esta tarea');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findOne(id, user);

    const project = await this.projectRepository.findOne({
      where: { id: task.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Proyecto asociado no encontrado`);
    }

    if (project.userId !== user.id && user.role !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para modificar esta tarea');
    }

    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async remove(id: string, user: User): Promise<void> {
    const task = await this.findOne(id, user);

    const project = await this.projectRepository.findOne({
      where: { id: task.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Proyecto asociado no encontrado`);
    }

    if (project.userId !== user.id && user.role !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para eliminar esta tarea');
    }

    await this.taskRepository.remove(task);
  }

  async findByProject(projectId: string, user: User): Promise<Task[]> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${projectId} no encontrado`);
    }

    if (project.userId !== user.id && user.role !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para ver las tareas de este proyecto');
    }

    return await this.taskRepository.find({
      where: { projectId },
      relations: ['assignedTo'],
    });
  }
}
