import { PartialType } from '@nestjs/swagger';
import { CreateVitalSignDto } from './create-vital_sign.dto';

export class UpdateVitalSignDto extends PartialType(CreateVitalSignDto) {}
