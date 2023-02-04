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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePedalDto } from './dto/create-pedal.dto';
import { GetActivePedalsDto } from './dto/get-active-pedals.dto';
import { PedalService } from './pedal.service';

@ApiTags('Pedal')
@Controller('pedal')
export class PedalController {
  constructor(private readonly pedalService: PedalService) {}
  @ApiOperation({ summary: 'Cria um Pedal' })
  @ApiBearerAuth()
  @Post()
  create(@Body() data: CreatePedalDto, @Req() req) {
    return this.pedalService.create(data, req.user.userId);
  }
  @ApiOperation({ summary: 'Encontra Pedais ativos' })
  @ApiBearerAuth()
  @Get()
  async find() {
    return (await this.pedalService.activePedals()).map(
      (pedal) => new GetActivePedalsDto(pedal),
    );
  }

  @ApiOperation({ summary: 'Registra-se em um Pedal' })
  @ApiBearerAuth()
  @Patch(':pedalId')
  registerOnPedal(@Param('pedalId', ParseIntPipe) pedalId: number, @Req() req) {
    return this.pedalService.registerOnPedal(pedalId, req.user.userId);
  }
}
