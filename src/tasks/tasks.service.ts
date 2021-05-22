import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: Task['id']): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: Task['id'], status: Task['status']): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }

  deleteTask(deleteTaskDto: DeleteTaskDto): void {
    this.tasks = this.tasks.filter((task) => task.id !== deleteTaskDto.id);

    return;
  }
}
