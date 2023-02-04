export class CreatePedalDto {
  name: string;
  startDate: Date;
  startDateRegistration: Date;
  endDateRegistration: Date;
  additionalInformation?: string;
  startPlace: string;
  participantsLimit?: number;
}
