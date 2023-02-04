import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedal } from './entity/pedal.entity';
import { UserToPedal } from './entity/user-to-pedal.entity';
import { PedalController } from './pedal.controller';
import { PedalService } from './pedal.service';

@Module({
  controllers: [PedalController],
  providers: [PedalService],
  imports: [TypeOrmModule.forFeature([Pedal, UserToPedal])],
})
export class PedalModule {}
