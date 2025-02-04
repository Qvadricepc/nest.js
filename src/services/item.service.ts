import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../modules/item/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ['list'] });
  }

  async create(description: string, listId: string): Promise<Item> {
    const item = this.itemRepository.create({
      description,
      list: { id: listId },
      isDone: false,
    });
    return await this.itemRepository.save(item);
  }

  async update(id: string, isDone: boolean): Promise<Item | null> {
    await this.itemRepository.update(id, { isDone });
    return await this.itemRepository.findOne({
      where: { id },
      relations: ['list'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
