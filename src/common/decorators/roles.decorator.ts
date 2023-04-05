import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from '../enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
