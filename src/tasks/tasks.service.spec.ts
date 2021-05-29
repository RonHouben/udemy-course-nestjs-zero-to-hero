import { Test } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockedUser = { username: 'Test user' } as User;
const mockedTask = {
  title: 'Mocked Task',
  description: 'Mocked description',
} as Task;

const mockedTaskRepository = () => ({
  getTasks: jest.fn(),
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
    it('it gets all tasks from the repository', async () => {
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
});
