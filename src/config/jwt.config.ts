import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'topSecret51',
  signOptions: {
    expiresIn: 3600,
  },
};
