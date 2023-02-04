import { Pedal } from 'src/modules/pedal/entity/pedal.entity';
import { UserToPedal } from 'src/modules/pedal/entity/user-to-pedal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Pedal, (pedal) => pedal.owner)
  pedals: Pedal[];

  @OneToMany(() => UserToPedal, (userToPedal) => userToPedal.user)
  userToPedal: UserToPedal[];
}
