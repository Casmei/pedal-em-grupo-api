import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareDates } from 'src/shared/utils/date.util';
import { MoreThan, Repository } from 'typeorm';
import { CreatePedalDto } from './dto/create-pedal.dto';
import { Pedal } from './entity/pedal.entity';
import { UserToPedal } from './entity/user-to-pedal.entity';

@Injectable()
export class PedalService {
  constructor(
    @InjectRepository(Pedal)
    private readonly pedalRepository: Repository<Pedal>,
    @InjectRepository(UserToPedal)
    private readonly userToPedalRepository: Repository<UserToPedal>,
  ) {}

  async create(data: CreatePedalDto, userId: number) {
    const startDateRegistration = new Date(data.startDateRegistration);
    const endDateRegistration = new Date(data.endDateRegistration);
    const startDate = new Date(data.startDate);

    //ZOD
    this.validateDatesOfPedal(
      startDateRegistration,
      endDateRegistration,
      startDate,
    );

    return this.pedalRepository.save({
      ...data,
      users: [{ id: userId }],
      owner: { id: userId },
      startDateRegistration,
      endDateRegistration,
      startDate,
    });
  }

  async activePedals() {
    const date = new Date();
    return this.pedalRepository.find({
      where: {
        endDateRegistration: MoreThan(date),
      },
      relations: {
        userToPedal: { user: true },
      },
    });
  }

  async registerOnPedal(pedalId: number, userId: number) {
    await this.validateRegistration(pedalId, userId);

    return this.userToPedalRepository.save({
      pedal: { id: pedalId },
      user: { id: userId },
      subscription_pedal: new Date(),
    });
  }

  private validateDatesOfPedal(
    startDateRegistrations: Date,
    endDateRegistrations: Date,
    startPedalDate: Date,
  ) {
    const isValidRegisterDate = compareDates(
      startDateRegistrations,
      endDateRegistrations,
    );

    const isValidStartPedalDate = compareDates(
      endDateRegistrations,
      startPedalDate,
    );

    if (!isValidRegisterDate) {
      throw new BadRequestException(
        'The end date cannot be earlier than the start date',
      );
    }

    if (!isValidStartPedalDate) {
      throw new BadRequestException(
        'The start date cannot be earlier than the end date of registration.',
      );
    }

    //TODO: validar cenario onde a data de fim do cadastro é o mesmo do inicio da corrida
  }

  private async validateRegistration(pedalId: number, userId: number) {
    if (await this.isOwnerOfThePedal(pedalId, userId)) {
      throw new BadRequestException(
        'The owner cannot register on the pedal he created',
      );
    }

    if (await this.canRegister(pedalId)) {
      throw new BadRequestException('Expired registration time');
    }
  }

  private async isOwnerOfThePedal(pedalId: number, userId: number) {
    return !!(await this.pedalRepository.findOneBy({
      id: pedalId,
      owner: { id: userId },
    }));
  }

  private async canRegister(pedalId: number) {
    const { endDateRegistration } = await this.pedalRepository.findOneBy({
      id: pedalId,
    });

    return compareDates(endDateRegistration, new Date());
  }
}
