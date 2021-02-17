import { isClass } from '@internal/test-util';

import { <name-capitalize-united> } from './index';

describe('Log drivers API', () => {
  describe('Services', () => {
    it(`exposes ${<name-capitalize-united>.name}`, () => {
      const sut = <name-capitalize-united>;

      expect(isClass(sut)).withContext(`${sut.name} is not a class`).toBeTrue();
    });
  });
});
