import { PartialType } from '@nestjs/swagger';
import { CreateMapBoxDto } from './create-map-box.dto';

export class UpdateMapBoxDto extends PartialType(CreateMapBoxDto) {}
