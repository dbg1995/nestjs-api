import { Module } from '@nestjs/common';

import { PagyService } from './pagy.service';

@Module({
  providers: [PagyService],
  exports: [PagyService],
})
export class PagyModule {}
