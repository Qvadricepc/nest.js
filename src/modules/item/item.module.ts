import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemController } from './item.controller';
import { ItemService } from '../../services/item.service';
import { ListModule } from '../list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), ListModule],
  providers: [ItemService],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
