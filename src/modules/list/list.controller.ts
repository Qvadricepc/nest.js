import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { ListService } from '../../services/list.service';
import { UpdateListDto } from './dto/update-list.dto';
import { CreateListDto } from './dto/create-list.dto';

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
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(id);
  }
}
