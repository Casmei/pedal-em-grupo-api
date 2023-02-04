import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareDates } from 'src/shared/utils/date.util';
import { LessThan, MoreThan, Repository } from 'typeorm';
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

    this.validatePedalDatesCreate(
      startDateRegistration,
      endDateRegistration,
      startDate,
    );

    const pedal = await this.pedalRepository.save({
      ...data,
      users: [{ id: userId }],
      owner: { id: userId },
      startDateRegistration,
      endDateRegistration,
      startDate,
    });

    this.userToPedalRepository.save({
      pedal,
      user: { id: userId },
      subscription_pedal: new Date(),
    });

    return pedal;
  }

  async activePedals() {
    const date = new Date();

    const a = await this.pedalRepository.find({
      where: {
        endDateRegistration: MoreThan(date),
        startDateRegistration: LessThan(date),
      },
      relations: {
        userToPedal: { user: true },
      },
    });

    return a;
  }

  async registerOnPedal(pedalId: number, userId: number) {
    await this.validateUserRegistration(pedalId, userId);

    return this.userToPedalRepository.save({
      pedal: { id: pedalId },
      user: { id: userId },
      subscription_pedal: new Date(),
    });
  }

  private validatePedalDatesCreate(
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

  private async validateUserRegistration(pedalId: number, userId: number) {
    const pedal = await this.pedalRepository.findOne({
      where: { id: pedalId },
      relations: {
        userToPedal: true,
      },
    });

    if (compareDates(new Date(), pedal.startDateRegistration)) {
      throw new BadRequestException('Registration date not started');
    }

    if (compareDates(pedal.endDateRegistration, new Date())) {
      throw new BadRequestException('Expired registration time');
    }

    if ((await pedal.owner.id) === userId) {
      throw new BadRequestException(
        'The owner cannot register on the pedal he created',
      );
    }
    console.log('🚀 ~ pedal', await pedal.userToPedal);

    if (pedal.participantsLimit < (await pedal.userToPedal.length)) {
      throw new BadRequestException('Limit number of participants reached');
    }
  }
}
