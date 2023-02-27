import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AddressesService, DirectionsTypes } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('addresses')
@UseGuards(AuthGuard('jwt'))
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get('/get-address/:address')
  getAddress(@Param('address') address: string) {
    return this.addressesService.getAddresses(address);
  }

  @Post('/create')
  create(@Body() createAddressDto: CreateAddressDto, @Req() req) {
    return this.addressesService.create(createAddressDto, req.user);
  }

  @Post('/directions/:coordinates?')
  getDirections(
    @Param('coordinates') coordinates: string,
    @Query('type') directionType: DirectionsTypes,
  ) {
    return this.addressesService.getDirection(coordinates, directionType);
  }

  @Get('/profile/address')
  findAll(@Req() req) {
    return this.addressesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.addressesService.findOne(id, req.user.id);
  }

  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() req,
  ) {
    return this.addressesService.update(id, updateAddressDto, req.user);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.addressesService.remove(id, req.user);
  }
}
