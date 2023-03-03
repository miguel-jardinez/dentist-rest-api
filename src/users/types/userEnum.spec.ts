import { UserRole } from '../../utils/RoleEnum';

describe('UserEnum', () => {
  it('should return Dentist role', () => {
    const role = UserRole.DENTIST;

    expect(role).toEqual('DENTIST');
  });

  it('should return Patient role', () => {
    const role = UserRole.PATIENT;

    expect(role).toEqual('PATIENT');
  });
});
