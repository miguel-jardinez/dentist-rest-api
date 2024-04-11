import { Injectable } from '@nestjs/common';
import { CreateVitalSignDto } from './dto/create-vital_sign.dto';
import { UpdateVitalSignDto } from './dto/update-vital_sign.dto';

@Injectable()
export class VitalSignsService {
  create(createVitalSignDto: CreateVitalSignDto) {
    return 'This action adds a new vitalSign';
  }

  findAll() {
    return `This action returns all vitalSigns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vitalSign`;
  }

  update(id: number, updateVitalSignDto: UpdateVitalSignDto) {
    return `This action updates a #${id} vitalSign`;
  }

  remove(id: number) {
    return `This action removes a #${id} vitalSign`;
  }
}
