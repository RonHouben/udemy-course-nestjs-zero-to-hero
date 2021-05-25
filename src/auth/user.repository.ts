import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger('UserRepository');

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();

    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // 23505 === duplicate username
        throw new ConflictException(
          `User with username "${username}" already exists`,
        );
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User['username']> {
    this.logger.verbose(
      `Validation User Password for user "${authCredentialsDto.username}"`,
    );
    const { username, password } = authCredentialsDto;

    try {
      const user = await this.findOne({ username });

      if (user && (await user.validatePassword(password))) {
        this.logger.verbose(`Found user "${username}"`);

        return user.username;
      } else {
        this.logger.verbose(
          `Unable to find user "${username}" in the database`,
        );
        return null;
      }
    } catch (error) {
      this.logger.error(
        `Failed to lookup user "${username}" in the database`,
        error.stack,
      );
      throw new InternalServerErrorException("Couldn't get user from database");
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
