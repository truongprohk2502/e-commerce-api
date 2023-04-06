import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export interface IJwtPayload {
  id: number;
  email_address: string;
  role: Role;
}

export const JwtPayload = createParamDecorator(
  (data: any, ctx: ExecutionContext): IJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
