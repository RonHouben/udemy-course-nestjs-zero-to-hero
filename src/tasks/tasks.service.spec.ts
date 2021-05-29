import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockedUser = { id: 12, username: 'Test user' } as User;
const mockedTask = {
  title: 'Mocked Task',
  description: 'Mocked description',
} as Task;

const mockedTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: jest.Mocked<TaskRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockedTaskRepository },
      ],
    }).compile();

    tasksService = await module.get(TasksService);
    taskRepository = await module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue([mockedTask]);

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDto = {
        search: 'Some search query',
        status: TaskStatus.IN_PROGRESS,
      };

      const result = await tasksService.getTasks(filters, mockedUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual([mockedTask]);
    });
  });

  describe('getTaskById', () => {
    it('calls TaskRepository.findOne() and successfully retrieves and returns the correct task', async () => {
      taskRepository.findOne.mockResolvedValue(mockedTask);

      const result = await tasksService.getTaskById(1, mockedUser);

      expect(taskRepository.findOne).toBeCalledWith({
        where: {
          id: 1,
          userId: mockedUser.id,
        },
      });
      expect(result).toEqual(mockedTask);
    });

    it('throws an error if task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById(1, mockedUser)).rejects.toThrow(
        new NotFoundException(`Task with id "${1}" not found`),
      );
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.create() and returns the result', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'my new task',
        description: 'this is my new task',
      };

      taskRepository.createTask.mockResolvedValue(mockedTask);
      expect(taskRepository.createTask).not.toBeCalled();

      const createdTask = await tasksService.createTask(
        createTaskDto,
        mockedUser,
      );

      expect(taskRepository.createTask).toBeCalledWith(
        createTaskDto,
        mockedUser,
      );

      expect(createdTask).toEqual(mockedTask);
    });
  });
});
