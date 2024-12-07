import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Pizza } from './pizza.entity';

@Entity('additionals')
export class Additional {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @Column({ name: 'additional_time', type: 'integer' })
  additionalTime: number;

  @Column({ name: 'additional_price', type: 'float' })
  additionalPrice: number;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @ManyToMany(() => Pizza, (pizza) => pizza.additionals)
  @JoinTable({
    name: 'pizza_additionals',
    joinColumns: [{ name: 'pizza_id' }],
    inverseJoinColumns: [{ name: 'additional_id' }],
  })
  pizzas: Pizza[] | null;
}