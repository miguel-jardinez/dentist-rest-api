import { PartialType } from '@nestjs/swagger';
import { CreateTeethDto } from './create-teeth.dto';

export class UpdateTeethDto extends PartialType(CreateTeethDto) {}
