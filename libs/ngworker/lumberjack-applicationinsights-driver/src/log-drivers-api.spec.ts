import { isClass } from '@internal/test-util';

import { LumberjackApplicationinsightsDriver } from './index';

describe('Log drivers API', () => {
  describe('Services', () => {
    it(`exposes ${LumberjackApplicationinsightsDriver.name}`, () => {
      const sut = LumberjackApplicationinsightsDriver;

      expect(isClass(sut)).withContext(`${sut.name} is not a class`).toBeTrue();
    });
  });
});
