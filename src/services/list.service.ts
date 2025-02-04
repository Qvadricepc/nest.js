import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../modules/list/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  findAll(): Promise<List[]> {
    return this.listRepository.find({ relations: ['items'] });
  }

  findOne(id: string): Promise<List | null> {
    return this.listRepository.findOne({ where: { id }, relations: ['items'] });
  }

  async create(name: string): Promise<List> {
    const list = this.listRepository.create({ name });
    return await this.listRepository.save(list);
  }

  async remove(id: string): Promise<void> {
    await this.listRepository.delete(id);
  }
}
