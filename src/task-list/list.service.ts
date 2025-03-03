import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../entities/list.entity';
import { UpdateListDto } from './dto/update-list.dto';
import { CreateListDto } from './dto/create-list.dto';
import { FindAllListsDto } from './dto/find-all-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async findAll(query: FindAllListsDto) {
    const { offset = 0, limit = 10 } = query;

    const [items, total] = await this.listRepository
      .createQueryBuilder('list')
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { items, total, offset, limit };
  }

  async findOne(id: string): Promise<List> {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!list) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return list;
  }

  async create(createListDto: CreateListDto): Promise<List> {
    const list = this.listRepository.create(createListDto);
    return await this.listRepository.save(list);
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<List> {
    const list = await this.findOne(id);

    Object.assign(list, updateListDto);
    return await this.listRepository.save({ ...list, ...updateListDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.listRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
  }
}
