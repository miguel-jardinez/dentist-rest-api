import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDentistAddressDto } from './dto/create-dentist-establishment-address.dto';
import { UpdateDentistAddressDto } from './dto/update-dentist-establishment-address.dto';
import { EstablishmentAddressService } from '@features/dentist-establishment-address/dentist-establishment-address.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dentist Establishment Address')
@Controller('dentistEstablishmentAddress')
export class EstablishmentAddressController {
  constructor(
    private readonly establishmentAddressService: EstablishmentAddressService,
  ) {}

  @Post()
  create(@Body() createDentistAddressDto: CreateDentistAddressDto) {
    return this.establishmentAddressService.create(createDentistAddressDto);
  }

  @Get()
  findAll() {
    return this.establishmentAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establishmentAddressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDentistAddressDto: UpdateDentistAddressDto,
  ) {
    return this.establishmentAddressService.update(+id, updateDentistAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentAddressService.remove(+id);
  }
}
