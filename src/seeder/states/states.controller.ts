import { Controller, Get, Post } from '@nestjs/common';
import { StatesService } from './states.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('States')
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  create() {
    return this.statesService.createStatesList();
  }

  @Get()
  getState() {
    return this.statesService.getStates();
  }
}
