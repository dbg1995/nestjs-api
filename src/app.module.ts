import { Module } from '@nestjs/common';

import { CoreModule } from './core.module';
import { ApiModule } from './api/module/api.module';

@Module({
  imports: [CoreModule, ApiModule],
})
export class AppModule {}
