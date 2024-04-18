import {
  AddressAutofillSuggestion,
  MatchCode,
  MatchCodeConfidence,
} from '@mapbox/search-js-core';
import { ApiProperty } from '@nestjs/swagger';

class MatchCodeDto implements MatchCode {
  @ApiProperty({ enum: ['exact', 'high', 'medium', 'low'] })
  confidence: MatchCodeConfidence;
  @ApiProperty()
  exact_match: boolean;
  @ApiProperty()
  house_number: boolean;
  @ApiProperty()
  locality: boolean;
  @ApiProperty()
  place: boolean;
  @ApiProperty()
  postcode: boolean;
  @ApiProperty()
  region: boolean;
  @ApiProperty()
  street: boolean;
}

class MetaData {
  @ApiProperty()
  iso_3166_1: string;
}

class ActionDto {
  @ApiProperty()
  id: string;
}

export class CreateMapBoxDto implements AddressAutofillSuggestion {
  @ApiProperty()
  accuracy: string;
  @ApiProperty({ type: ActionDto })
  action: ActionDto;
  @ApiProperty()
  address: string;
  @ApiProperty()
  address_level1: string;
  @ApiProperty()
  address_level2: string;
  @ApiProperty()
  address_level3: string;
  @ApiProperty()
  address_line1: string;
  @ApiProperty()
  address_line2: string;
  @ApiProperty()
  address_line3: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  country_code: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  feature_name: string;
  @ApiProperty()
  full_address: string;
  @ApiProperty()
  language: string;
  @ApiProperty()
  maki: string;
  @ApiProperty({ type: MatchCodeDto })
  match_code: MatchCode;
  @ApiProperty()
  matching_name: string;
  @ApiProperty({ type: MetaData })
  metadata: MetaData;
  @ApiProperty()
  original_search_text: string;
  @ApiProperty()
  place_name: string;
  @ApiProperty()
  postcode: string;
}
