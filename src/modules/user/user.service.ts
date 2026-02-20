import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  getUser(username: string) {
    return this.usersRepo.findOne({ where: { username }, relations: ['tasks'] });
  }

  createUser(userData: any) {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  updateUser(updateData: any) {
    return this.usersRepo.update({ username: updateData.username }, updateData);
  }

  deleteUser(username: string) {
    return this.usersRepo.delete({ username });
  }
}