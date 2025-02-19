import { Column, Entity, OneToMany } from 'typeorm';
import { Item } from '../item/item.entity';
import { BaseEntity } from '../../common/abstracts/base-entiy.abstract';

@Entity()
export class List extends BaseEntity {
  @Column({ name: 'name', length: 30 })
  name: string;

  @OneToMany(() => Item, (item) => item.list, { cascade: true })
  items: Item[];
}
