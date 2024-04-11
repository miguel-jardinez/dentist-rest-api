import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDentistAddressDto } from './dto/create-dentist_address.dto';
import { UpdateDentistAddressDto } from './dto/update-dentist_address.dto';
import { EstablishmentAddressService } from '@features/establishment_address/establishment_address.service';

@Controller('dentist-address')
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
