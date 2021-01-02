import User from '@modules/users/infra/typeorm/entities/User';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('appointments')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: string;

  @Column('timestamp with time zone')
  booking_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
