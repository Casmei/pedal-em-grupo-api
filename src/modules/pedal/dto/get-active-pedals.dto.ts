import { Pedal } from '../entity/pedal.entity';
import { UserToPedalType } from '../protocols/user-to-pedal.type';

export class GetActivePedalsDto {
  constructor(pedalEntity: Pedal) {
    this.id = pedalEntity.id;
    this.name = pedalEntity.name;
    this.startDate = pedalEntity.startDate;
    this.startDateRegistration = pedalEntity.startDateRegistration;
    this.endDateRegistration = pedalEntity.endDateRegistration;
    this.startPlace = pedalEntity.startPlace;
    this.additionalInformation = pedalEntity.additionalInformation;
    this.participantsLimit = pedalEntity.participantsLimit;
    this.userToPedal = pedalEntity.userToPedal.map((userToPedal) => ({
      id: userToPedal.id,
      subscription_pedal: userToPedal.subscription_pedal,
      user: {
        id: userToPedal.user.id,
        name: userToPedal.user.name,
        email: userToPedal.user.email,
      },
    }));
  }

  id: number;
  name: string;
  startDate: Date;
  startDateRegistration: Date;
  endDateRegistration: Date;
  additionalInformation?: string;
  startPlace: string;
  participantsLimit?: number;
  userToPedal: UserToPedalType[];
}
