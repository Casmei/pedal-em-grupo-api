import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/modules/user/entity/user.entity';

export class RegisterAuthDto extends PickType(User, [
  'name',
  'email',
  'password',
]) {}
