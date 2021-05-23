import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let filteredTasks: Task[] = this.getAllTasks();
  //   if (status) {
  //     filteredTasks = filteredTasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     filteredTasks = filteredTasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return filteredTasks;
  // }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async getTaskById(id: Task['id']): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return found;
  }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //     id: uuid(),
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTaskStatus(id: Task['id'], status: Task['status']): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // deleteTask(id: Task['id']): void {
  //   const foundTask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  //   return;
  // }
}
