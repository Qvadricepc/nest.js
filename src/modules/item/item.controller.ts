import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ItemService } from '../../services/item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Post()
  create(
    @Body('description') description: string,
    @Body('listId') listId: string,
  ) {
    return this.itemService.create(description, listId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('isDone') isDone: boolean) {
    return this.itemService.update(id, isDone);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
