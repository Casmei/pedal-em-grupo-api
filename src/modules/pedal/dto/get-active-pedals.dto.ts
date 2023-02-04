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

  /**
   * ID do Pedal
   * @example 1
   */
  id: number;
  /**
   * Nome do Pedal
   * @example 'Pedal Turistico - Almenara'
   */
  name: string;
  /**
   * Inicio da data de cadastro
   * @example '2023-02-10'
   */
  startDate: Date;
  /**
   * Inicio da data de cadastro
   * @example '2023-02-10'
   */
  startDateRegistration: Date;
  /**
   * Final da data de cadastro
   * @example '2023-02-20'
   */
  endDateRegistration: Date;
  /**
   * Informações adicionais ao pedal
   * @example 'Levem uma garrafa d'água'
   */
  additionalInformation?: string;
  /**
   * Número máximo de participantes
   * @example 10
   */
  startPlace: string;
  /**
   * ID do dono do Pedal
   * @example 1
   */
  owner: { id: number };
  /**
   * Número máximo de participantes
   * @example 10
   */
  participantsLimit?: number;
  /**
   * Listagem de usúarios participantes do evento
   * @example {id: 1, subscription_date: '2023-02-17', user: {id: 1, name: 'Tiago', email: 'casmei@protonmail.com'} }
   */
  userToPedal: UserToPedalType[];
}
