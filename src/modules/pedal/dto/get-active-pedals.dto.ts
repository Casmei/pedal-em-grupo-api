import { Pedal } from '../entity/pedal.entity';
import { UserToPedalType } from '../protocols/user-to-pedal.type';

export class GetActivePedalsDto {
  constructor(pedalEntity: Pedal) {
    delete pedalEntity.owner.password;
    this.id = pedalEntity.id;
    this.name = pedalEntity.name;
    this.startDate = pedalEntity.startDate;
    this.startDateRegistration = pedalEntity.startDateRegistration;
    this.endDateRegistration = pedalEntity.endDateRegistration;
    this.startPlace = pedalEntity.startPlace;
    this.additionalInformation = pedalEntity.additionalInformation;
    this.participantsLimit = pedalEntity.participantsLimit;
    this.owner = pedalEntity.owner;
    this.userToPedal = pedalEntity.userToPedal.map((userToPedal) => {
      delete userToPedal.user.password;
      return userToPedal;
    });
  }

  id: number;
  name: string;
  startDate: Date;
  startDateRegistration: Date;
  endDateRegistration: Date;
  additionalInformation?: string;
  startPlace: string;
  owner: { id: number };
  participantsLimit?: number;
  userToPedal: UserToPedalType[];
}
