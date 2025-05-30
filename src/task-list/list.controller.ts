import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { ListService } from './list.service';
import { UpdateListDto } from './dto/update-list.dto';
import { CreateListDto } from './dto/create-list.dto';
import { FindAllListsDto } from './dto/find-all-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAll(@Query() query: FindAllListsDto) {
    return this.listService.findAll(query);
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
