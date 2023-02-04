import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreatePedalDto } from './dto/create-pedal.dto';
import { GetActivePedalsDto } from './dto/get-active-pedals.dto';
import { PedalService } from './pedal.service';

@Controller('pedal')
export class PedalController {
  constructor(private readonly pedalService: PedalService) {}
  @Post()
  create(@Body() data: CreatePedalDto, @Req() req) {
    return this.pedalService.create(data, req.user.userId);
  }

  @Get()
  async find() {
    return (await this.pedalService.activePedals()).map(
      (pedal) => new GetActivePedalsDto(pedal),
    );
  }

  @Patch(':pedalId')
  registerOnPedal(@Param('pedalId', ParseIntPipe) pedalId: number, @Req() req) {
    return this.pedalService.registerOnPedal(pedalId, req.user.userId);
  }
}
