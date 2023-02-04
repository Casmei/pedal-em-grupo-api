export class CreatePedalDto {
  /**
   * Nome do Pedal
   * @example '1º Pedal Turistico - Almenara'
   */
  name: string;
  /**
   * Data de inicio
   * @example '2023-02-30'
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
   * Local de saída do pedal
   * @example 'Praça Central'
   */
  startPlace: string;
  /**
   * Número máximo de participantes
   * @example 10
   */
  participantsLimit?: number;
}
