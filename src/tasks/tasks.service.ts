import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(getTaskByIdDto: GetTaskByIdDto): Task {
    return this.tasks.find((task) => task.id === getTaskByIdDto.id);
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
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, status } : task,
    );

    return {
      ...this.tasks.find((task) => task.id === id),
      status,
    };
  }

  deleteTask(deleteTaskDto: DeleteTaskDto): void {
    this.tasks = this.tasks.filter((task) => task.id !== deleteTaskDto.id);

    return;
  }
}
