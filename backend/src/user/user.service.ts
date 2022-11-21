import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }
  checkUser(username: string, password: string) {
    return this.userRepo.find({
      where: { username: username, password: password },
    });
  }
  findAll() {
    return this.userRepo.find();
  }
  async findOne(itemid: number) {
    return await this.userRepo.findOne({
      where: { id: itemid },
      relations: ['notes'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepo.delete({ id });
  }
}
