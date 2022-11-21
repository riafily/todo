import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UserService } from 'src/user/user.service';

@Controller('list')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly userService: UserService,
  ) {}

  @Post('add')
  async create(@Body() createNoteDto: CreateNoteDto) {
    console.log("ädd");
    console.log(createNoteDto);
    const userData = await this.userService.findOne(createNoteDto.user);
    return this.notesService.create(createNoteDto, userData);
  }

  @Get('listId')
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Get('getUserList/:id')
  async findlist(@Param('id') id: string) {
    const data = this.notesService.findOne(+id);
    return await this.notesService.getUserList(data);
  }

  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
