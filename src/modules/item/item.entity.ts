import { Column, Entity, ManyToOne } from 'typeorm';
import { List } from '../list/list.entity';
import { BaseEntity } from '../../common/abstracts/base-entiy.abstract';

@Entity()
export class Item extends BaseEntity {
  @Column({ name: 'description', length: 120 })
  description: string;

  @Column({ name: 'is_done', default: false })
  isDone: boolean;

  @ManyToOne(() => List, (list) => list.items, { onDelete: 'CASCADE' })
  list: List;
}
