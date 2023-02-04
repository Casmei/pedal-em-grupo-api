import { User } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserToPedal } from './user-to-pedal.entity';

@Entity()
export class Pedal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  startDateRegistration: Date;

  @Column()
  endDateRegistration: Date;

  @Column({ type: 'text', nullable: true })
  additionalInformation?: string;

  @Column()
  startPlace: string;

  @Column({ nullable: true })
  participantsLimit?: number;

  @ManyToOne(() => User, (user) => user.pedals)
  owner: User;

  @OneToMany(() => UserToPedal, (userToPedal) => userToPedal.pedal)
  userToPedal: UserToPedal[];
}
