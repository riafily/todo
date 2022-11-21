import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userData: any) {
    return await this.noteRepo.save({
      item: createNoteDto.item,
      user: userData,
    });
  }

  findAll() {
    return this.noteRepo.find({ relations: ['user'] });
  }
  getUserList(userdata: any) {
    return this.noteRepo.find({
      where: { user: userdata },
    });
  }

  findOne(id: number) {
    return this.noteRepo.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  update(id: number, updateNoteDto: any) {
    return this.noteRepo.update(id, updateNoteDto);
  }

  remove(id: number) {
    return this.noteRepo.delete(id);
  }
}
