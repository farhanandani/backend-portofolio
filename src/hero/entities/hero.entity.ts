import { BaseEntity } from '../../base-entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class Hero extends BaseEntity {
  @Property({ length: 35 })
  headerOne: string;

  @Property({ length: 30 })
  headerTwo: string;

  @Property({ length: 150 })
  description: string;

  constructor(headerOne: string, headerTwo: string, description: string) {
    super();
    this.headerOne = headerOne;
    this.headerTwo = headerTwo;
    this.description = description;
  }
}
