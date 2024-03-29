import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AddressType } from './types/address.type';
import { AddressEntity } from './entities/address.entity';
import { ErrorService } from '../utils/ErrorService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { DirectionsTypesResponse } from './types/directionTypes';

export type DirectionsTypes =
  | 'driving-traffic'
  | 'driving'
  | 'walking'
  | 'cycling';

@Injectable()
export class AddressesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly errorService: ErrorService,
    @InjectRepository(AddressEntity)
    private readonly addressEntity: Repository<AddressEntity>,
    private readonly profileService: ProfileService,
  ) {}

  async create(createAddressDto: CreateAddressDto, id: string) {
    try {
      const addresses = await this.findAll(id);
      const profile = await this.profileService.findByUserId(id);

      if (createAddressDto.is_default && addresses.length >= 1) {
        await this.setDefaultAddress(addresses);
      }

      const addressModel = this.addressEntity.create(createAddressDto);

      return await this.addressEntity.save({
        ...addressModel,
        profile: {
          id: profile.id,
        },
      });
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async findAll(id: string): Promise<AddressEntity[]> {
    try {
      return await this.addressEntity.find({
        where: { profile: { user: { id } } },
      });
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async findOne(addressId: string, userId: string): Promise<AddressEntity> {
    try {
      return await this.addressEntity.findOneOrFail({
        where: { id: addressId, profile: { user: { id: userId } } },
      });
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async update(
    addressId: string,
    updateAddressDto: UpdateAddressDto,
    userId: string,
  ): Promise<string> {
    try {
      const address = await this.findAll(userId);
      const profile = await this.profileService.findByUserId(userId);

      if (updateAddressDto.is_default && address.length > 1) {
        await this.setDefaultAddress(address);

        return await this.updateAddress(
          addressId,
          profile.id,
          updateAddressDto,
        );
      } else {
        return await this.updateAddress(
          addressId,
          profile.id,
          updateAddressDto,
        );
      }
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async remove(addressId: string, userId: string): Promise<string> {
    try {
      const profile = await this.profileService.findByUserId(userId);
      const response = await this.addressEntity.delete({
        id: addressId,
        profile: { id: profile.id },
      });

      if (response.affected === 0) {
        this.errorService.errorHandling(
          '404',
          `Address ${addressId} no exists`,
        );
      }

      return `Address ${addressId} was deleted successful`;
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async getAddresses(address: string): Promise<AddressType> {
    const mapBoxUrl = this.configService.get<string>('MAP_BOX_URL');
    const mapBoxToken = this.configService.get<string>('MAP_BOX_TOKEN');
    const mapBoxCountry = 'mx';
    const mapBoxLimit = '5';
    const mapBoxType = 'address';
    const mapBoxLanguage = 'es';
    const mapBoxAddress = encodeURIComponent(address);

    const url = new URL(
      `${mapBoxUrl}/geocoding/v5/mapbox.places/${mapBoxAddress}.json`,
    );
    url.searchParams.append('country', mapBoxCountry);
    url.searchParams.append('limit', mapBoxLimit);
    url.searchParams.append('types', mapBoxType);
    url.searchParams.append('language', mapBoxLanguage);
    url.searchParams.append('access_token', mapBoxToken);

    const data = await this.httpService.axiosRef.get<AddressType>(
      url.toString(),
    );
    return data.data;
  }

  public async getDirection(
    coordinatesDirections: string,
    service: DirectionsTypes,
  ) {
    const mapBoxUrl = this.configService.get<string>('MAP_BOX_URL');
    const mapBoxToken = this.configService.get<string>('MAP_BOX_TOKEN');

    const url = new URL(
      `${mapBoxUrl}/directions/v5/mapbox/${service}/${encodeURIComponent(
        coordinatesDirections,
      )}`,
    );
    url.searchParams.append('alternatives', 'true');
    url.searchParams.append('continue_straight', 'true');
    url.searchParams.append('geometries', 'geojson');
    url.searchParams.append('language', 'es');
    url.searchParams.append('overview', 'simplified');
    url.searchParams.append('steps', 'true');
    url.searchParams.append('access_token', mapBoxToken);

    const data = await this.httpService.axiosRef.get<DirectionsTypesResponse>(
      url.toString(),
    );

    return data.data;
  }

  private async updateAddress(
    addressId: string,
    profileId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<string> {
    const response = await this.addressEntity.update(
      { id: addressId, profile: { id: profileId } },
      updateAddressDto,
    );

    if (response.affected === 0) {
      this.errorService.errorHandling('404', `Address ${addressId} not exists`);
    }

    return `Address ${addressId} was updated successfully`;
  }

  private async setDefaultAddress(address: AddressEntity[]): Promise<void> {
    const addressDefault = address.find((address) => address.is_default);

    await this.addressEntity.update(
      { id: addressDefault.id },
      { is_default: false },
    );
  }
}
