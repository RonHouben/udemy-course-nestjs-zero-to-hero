import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  status: TaskStatus;
}
