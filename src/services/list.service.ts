import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../modules/list/list.entity';
import { UpdateListDto } from '../modules/list/dto/update-list.dto';
import { CreateListDto } from '../modules/list/dto/create-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async findAll(): Promise<List[]> {
    return this.listRepository.find({ relations: ['items'] });
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
