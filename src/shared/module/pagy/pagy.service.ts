import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

import { Pagy } from './pagy.type';
import { PaginateDTO } from './dto/paginate.dto';

@Injectable()
export class PagyService<T> {
  async paginate(paginateDTO: PaginateDTO, queryBuilder: SelectQueryBuilder<T>, distinct = false): Promise<Pagy<T>> {
    const { count, page } = paginateDTO;
    if (distinct) {
      queryBuilder = queryBuilder.take(count).skip((page - 1) * count);
    } else {
      queryBuilder = queryBuilder.limit(count).offset((page - 1) * count);
    }
    const [data, total] = await queryBuilder.getManyAndCount();
    const pageCount = Math.ceil(total / count);
    const pagination = {
      count: data.length,
      total,
      page,
      pageCount,
    };

    return [data, pagination];
  }
}
