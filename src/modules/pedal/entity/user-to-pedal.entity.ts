import { User } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pedal } from './pedal.entity';

@Entity()
export class UserToPedal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.userToPedal, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  pedal: Pedal;

  @ManyToOne(() => User, (user) => user.userToPedal, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  subscription_pedal: Date;
}
