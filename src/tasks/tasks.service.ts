import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let filteredTasks: Task[] = this.getAllTasks();

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return filteredTasks;
  }

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

  deleteTask(id: Task['id']): void {
    const foundTask = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);

    return;
  }
}
