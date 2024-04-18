import { Injectable } from '@nestjs/common';
import {
  AddressAutofillCore,
  AddressAutofillFeatureSuggestion,
  AddressAutofillSuggestion,
  SessionToken,
} from '@mapbox/search-js-core';
import { MapBoxServiceRepositoryInterface } from '@features/map-box/repository/MapBoxServiceRepository.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { EnvConfigService } from '@core/env-config/env-config.service';
import { ErrorService } from '@utils/ErrorService';

@Injectable()
export class MapBoxService implements MapBoxServiceRepositoryInterface {
  private readonly autofillClient: AddressAutofillCore;
  private readonly autofillSessionClient: SessionToken;

  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly errorService: ErrorService,
  ) {
    this.autofillClient = new AddressAutofillCore({
      accessToken: this.envConfigService.getString('MAP_BOX_TOKEN'),
    });

    this.autofillSessionClient = new SessionToken();
  }

  async autofill(
    address: string,
  ): Promise<ResponseApi<AddressAutofillSuggestion[]>> {
    try {
      const response = await this.autofillClient.suggest(address, {
        language: 'es',
        country: 'mx',
        sessionToken: this.autofillSessionClient,
      });

      return new ResponseApi(response.suggestions, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getCompleteAddress(
    suggestion: AddressAutofillSuggestion,
  ): Promise<ResponseApi<AddressAutofillFeatureSuggestion[]>> {
    try {
      const response = await this.autofillClient.retrieve(suggestion, {
        sessionToken: this.autofillSessionClient,
      });

      return new ResponseApi(response.features, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
