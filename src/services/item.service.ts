import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../modules/item/item.entity';
import { List } from '../modules/list/list.entity';
import { CreateItemDto } from '../modules/item/dto/create-item.dto';
import { UpdateItemDto } from '../modules/item/dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ['list'] });
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['list'],
    });
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);
    return item;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { description, isDone = false, listId } = createItemDto;

    const list = await this.listRepository.findOne({ where: { id: listId } });
    if (!list) throw new NotFoundException(`List with id ${listId} not found`);

    const item = this.itemRepository.create({ description, isDone, list });
    return await this.itemRepository.save(item);
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);

    Object.assign(item, updateItemDto);
    return await this.itemRepository.save({ ...item, ...updateItemDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Item with id ${id} not found`);
  }
}
