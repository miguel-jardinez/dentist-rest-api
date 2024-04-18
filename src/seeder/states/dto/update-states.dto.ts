import { PartialType } from '@nestjs/swagger';
import { CreateStatesDto } from './create-states.dto';

export class UpdateStatesDto extends PartialType(CreateStatesDto) {}
