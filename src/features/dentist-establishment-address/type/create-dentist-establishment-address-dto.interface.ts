import { Point } from 'geojson';

export class CreateDentistEstablishmentAddressDtoInterface {
  streetName: string;
  streetNumber: number;
  interiorNumber?: number;
  neighborhood: string;
  stateId: string;
  zipCode: number;
  fullAddress: string;
  city: string;
  coordinates: Array<number>;
  establishmentId: string;
}
