import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  item: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne((type) => User, (user) => user.notes)
  user: User;
}
