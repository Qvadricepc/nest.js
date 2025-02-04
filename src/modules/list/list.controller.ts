import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ListService } from '../../services/list.service';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(id);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.listService.create(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(id);
  }
}
