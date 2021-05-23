import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: unknown) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `Value "${value}" is an invalid status. Allowed statuses are: ${JSON.stringify(
          this.allowedStatuses,
        )}`,
      );
    }

    return value;
  }

  private isStatusValid(status: unknown): boolean {
    const idx = this.allowedStatuses.indexOf(
      (status as string).toUpperCase() as TaskStatus,
    );

    return idx !== -1;
  }
}
