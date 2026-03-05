import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  getTask(id: string) {
    return this.tasksRepo.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });
  }

  createTask(taskData: any) {
    const task = this.tasksRepo.create(taskData);
    return this.tasksRepo.save(task);
  }

  updateTask(id: string, updateData: any) {
    return this.tasksRepo.update(Number(id), updateData);
  }

  deleteTask(id: string) {
    return this.tasksRepo.delete(Number(id));
  }
}