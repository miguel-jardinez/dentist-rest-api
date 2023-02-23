import { AddressEntity } from './address.entity';

describe('Address entity class', () => {
  it('should make and address with not fields', () => {
    const address = new AddressEntity();
    expect(address.is_default).toBeFalsy();
    expect(address.id).toBe(undefined);
    expect(address.full_address).toBe(undefined);
    expect(address.postal_code).toBe(undefined);
    expect(address.country).toBe(undefined);
    expect(address.coordinates).toBe(undefined);
  });

  it('should have all information', function () {
    const address = new AddressEntity(
      'mock_id',
      [20, 10],
      'mock_full_address',
      'mock_address_line',
      'mock_postal_code',
      'mock_exterior',
      true,
    );

    expect(address.suburb).toBeUndefined();
    expect(address.id).toBe('mock_id');
    expect(address.full_address).toBe('mock_full_address');
    expect(address.is_default).toBeTruthy();
    expect(address.address_number_exterior).toBe('mock_exterior');
  });
});
