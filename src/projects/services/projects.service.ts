import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDto,
      userId: user.id,
    });
    return await this.projectRepository.save(project);
  }

  async findAll(user: User): Promise<Project[]> {
    // Si es superadmin, devuelve todos los proyectos
    if (user.role === 'superadmin') {
      return await this.projectRepository.find({ relations: ['user'] });
    }
    // Si es usuario normal, solo sus proyectos
    return await this.projectRepository.find({
      where: { userId: user.id },
    });
  }

  async findOne(id: string, user: User): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    // Verificar permisos: solo el dueño o superadmin pueden ver el proyecto
    if (project.userId !== user.id && user.role !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para ver este proyecto');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, user: User): Promise<Project> {
    const project = await this.findOne(id, user);

    // Verificar permisos: solo el dueño o superadmin pueden actualizar
    if (project.userId !== user.id && user.role !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para modificar este proyecto');
    }

    Object.assign(project, updateProjectDto);
    return await this.projectRepository.save(project);
  }

  async remove(id: string, user: User): Promise<void> {
    const project = await this.findOne(id, user);

    // Verificar permisos: solo el dueño o superadmin pueden eliminar
    if (project.userId !== user.id && user.role !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para eliminar este proyecto');
    }

    await this.projectRepository.remove(project);
  }
}
