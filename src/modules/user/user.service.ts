import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAuthDto } from '../auth/dto/login-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(data: CreateUserDto) {
    return this.userRepository.save(data);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByCredentials(credentials: LoginAuthDto): Promise<User> {
    return this.userRepository.findOneBy({ email: credentials.email });
  }

  update(id: number, data: UpdateUserDto) {
    return this.userRepository.update(id, data);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
