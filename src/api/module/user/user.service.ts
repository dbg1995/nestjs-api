import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { PaginateDTO } from '../../../shared/module/pagy/dto/paginate.dto';
import { PagyService } from '../../../shared/module/pagy/pagy.service';
import { Pagy } from '../../../shared/module/pagy/pagy.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private pagyService: PagyService<UserEntity>,
  ) {}

  async findMany(paginateDTO: PaginateDTO): Promise<Pagy<UserEntity>> {
    const queryBuilder = await this.userRepository.createQueryBuilder().where({
      status: UserEntity.STATUS_ACTIVE,
      role: UserEntity.ROLE_USER,
    });
    return this.pagyService.paginate(paginateDTO, queryBuilder);
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      id,
      status: UserEntity.STATUS_ACTIVE,
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(currentUser: UserEntity, createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const user = this.userRepository.create({
      name: createUserDTO.name,
      avatar: createUserDTO.avatar,
      status: UserEntity.STATUS_ACTIVE,
      role: UserEntity.ROLE_USER,
    });

    return this.userRepository.save(user);
  }
}
