import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Pizza } from './pizza.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar', { length: 255, nullable: true })
    observation: string;

    @Column({ name: 'total_preparation_time', type: 'integer' })
    totalPreparationTime: number;

    @Column({ name: 'total_price', type: 'float' })
    totalPrice: number;

    @OneToMany(() => Pizza, (pizza) => pizza.order)
    pizzas: Pizza[];

    @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}