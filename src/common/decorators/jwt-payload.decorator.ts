import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../../users/enums/role.enum';

export interface IJwtPayload {
  id: number;
  emailAddress: string;
  role: Role;
}

export const JwtPayload = createParamDecorator(
  (data: any, ctx: ExecutionContext): IJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
