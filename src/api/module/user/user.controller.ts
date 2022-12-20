import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersDTO } from './dto/users.dto';
import { UserDTO } from './dto/user.dto';
import { Roles } from '../../decorator/rules.decorator';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { Id } from '../../decorator/id.decorator';
import { PaginateDTO } from '../../../shared/module/pagy/dto/paginate.dto';

@Controller('api/v1/users')
@Roles(UserEntity.ROLE_ADMIN)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async index(@Query() paginateDTO: PaginateDTO): Promise<UsersDTO> {
    const [users, pagination] = await this.userService.findMany(paginateDTO);

    return plainToClass(UsersDTO, { items: users, pagination });
  }

  @Get('/:id')
  async show(@Id() id: number): Promise<UserDTO> {
    const user = await this.userService.findOne(id);
    return plainToClass(UserDTO, user);
  }

  @Post()
  async create(@CurrentUser() currentUser: UserEntity, @Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userService.create(currentUser, createUserDTO);

    return plainToClass(UserDTO, user);
  }
}
