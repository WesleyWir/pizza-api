import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Order } from './order.entity';
import { Size } from './size.entity';
import { Additional } from './additional.entity';
import { Flavor } from './flavor.entity';

@Entity('pizzas')
export class Pizza {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => Order, (order) => order.pizzas)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'order_id', nullable: true })
  orderId: string;

  @ManyToOne(() => Size, (size) => size.pizzas)
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @Column({ name: 'size_id', nullable: false })
  sizeId: number;

  @ManyToOne(() => Flavor, (flavor) => flavor.pizzas)
  @JoinColumn({ name: 'flavor_id' })
  flavor: Flavor;

  @Column({ name: 'flavor_id', nullable: false })
  flavorId: number;

  @ManyToMany(() => Additional, (additional) => additional.pizzas)
  @JoinTable({
    name: 'pizza_additionals',
    joinColumns: [{ name: 'pizza_id' }],
    inverseJoinColumns: [{ name: 'additional_id' }],
  })
  additionals: Additional[] | null;

  @Column({ type: 'float' })
  price: number;

  @Column({ name: 'preparation_time', type: 'int' })
  preparationTime: number;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}