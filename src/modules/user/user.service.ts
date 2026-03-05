import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  getUser(username: string) {
    return this.usersRepo.findOne({
      where: { username },
      relations: ['tasks'],
    });
  }

  createUser(userData: createUserDto) {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  updateUser(updateData: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.usersRepo.update({ username: updateData.username }, updateData);
  }

  deleteUser(username: string) {
    return this.usersRepo.delete({ username });
  }
}