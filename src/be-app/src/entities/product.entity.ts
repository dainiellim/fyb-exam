import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  sku: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
