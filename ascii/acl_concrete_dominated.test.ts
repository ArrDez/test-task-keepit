import acl_concrete_dominated from './acl_concrete_dominated';

const EFFECTIVE_ACL = 'G/Time:GDP/Users'

it('G/Time should be dominated by G/Time:GDP/Users', () => {
  expect(acl_concrete_dominated("G/Time", EFFECTIVE_ACL)).toBe(true);
});

it('D/Users should be dominated by G/Time:GDP/Users', () => {
  expect(acl_concrete_dominated("D/Users", EFFECTIVE_ACL)).toBe(true);
});

it('PD/Users should be dominated by G/Time:GDP/Users', () => {
  expect(acl_concrete_dominated("PD/Users", EFFECTIVE_ACL)).toBe(true);
});

it('P/Time should NOT be dominated by G/Time:GDP/Users', () => {
  expect(acl_concrete_dominated("P/Time", EFFECTIVE_ACL)).toBe(false);
});

it('H/Users should NOT be dominated by G/Time:GDP/Users', () => {
  expect(acl_concrete_dominated("H/Users", EFFECTIVE_ACL)).toBe(false);
});

it('Should throw error if invalid arguments are provided', () => {
  //@ts-ignore
  expect(() => acl_concrete_dominated('some_random_str', EFFECTIVE_ACL)).toThrowError('Invalid argument: concrete');
});

it('Should throw error if arguments are not provided', () => {
  //@ts-ignore
  expect(() => acl_concrete_dominated('G/Users', 'some_random_str')).toThrowError('Invalid argument: effective');
});

it('Should throw error if acl has invalid operations list', () => {
  expect(() =>
    acl_concrete_dominated("A/Users", EFFECTIVE_ACL)
  ).toThrowError('Invalid argument: concrete');
});
