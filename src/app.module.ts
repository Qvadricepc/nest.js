import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModule } from './modules/list/list.module';
import { ItemModule } from './modules/item/item.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, ListModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
