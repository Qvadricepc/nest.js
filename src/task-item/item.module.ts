import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ListModule } from '../task-list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), ListModule],
  providers: [ItemService],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
