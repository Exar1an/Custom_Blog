import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';
import { AuthModule } from '../auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';
import { RolesResolver } from './roles.resolver';


@Module({
  providers: [RolesService, RolesResolver],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    RolesService,
  ]
})
export class RolesModule {}
