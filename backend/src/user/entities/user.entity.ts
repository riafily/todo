import { Note } from 'src/notes/entities/note.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // @JoinColumn({ name: 'note' })
  @OneToMany((type) => Note, (notes) => notes.user)
  notes: Note[];
}
