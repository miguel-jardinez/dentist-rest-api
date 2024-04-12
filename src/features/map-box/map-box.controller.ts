import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MapBoxService } from './map-box.service';
import { AuthGuard } from '@nestjs/passport';
import { MapBoxServiceRepositoryInterface } from '@features/map-box/repository/MapBoxControllerRepository.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { AddressAutofillSuggestion } from '@mapbox/search-js-core';

@Controller('mapBox')
@UseGuards(AuthGuard('jwt'))
export class MapBoxController implements MapBoxServiceRepositoryInterface {
  constructor(private readonly mapBoxService: MapBoxService) {}

  @Get('/autofill')
  async autofill(
    @Query('query') query: string,
  ): Promise<ResponseApi<AddressAutofillSuggestion[]>> {
    return this.mapBoxService.autofill(query);
  }

  @Post('/getAddressDetails')
  async getCompleteAddress(@Body() address: AddressAutofillSuggestion) {
    return this.mapBoxService.getCompleteAddress(address);
  }
}
