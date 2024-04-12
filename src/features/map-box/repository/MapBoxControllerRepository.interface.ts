import { ResponseApi } from '@utils/ResponseApi';
import {
  AddressAutofillFeatureSuggestion,
  AddressAutofillSuggestion,
} from '@mapbox/search-js-core';

export interface MapBoxServiceRepositoryInterface {
  autofill: (
    address: string,
  ) => Promise<ResponseApi<AddressAutofillSuggestion[]>>;
  getCompleteAddress: (
    suggestion: AddressAutofillSuggestion,
  ) => Promise<ResponseApi<AddressAutofillFeatureSuggestion[]>>;
}
