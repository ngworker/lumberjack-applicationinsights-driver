import { InjectionToken } from '@angular/core';

import { isClass } from '@internal/test-util';

import {
  LumberjackApplicationinsightsDriverConfig,
  lumberjackApplicationinsightsDriverConfigToken,
  LumberjackApplicationinsightsDriverModule,
  LumberjackApplicationinsightsDriverOptions,
} from './index';

describe('Configuration API', () => {
  describe('Interfaces', () => {
    it('exposes LumberjackApplicationinsightsDriverConfig', () => {
      const value: LumberjackApplicationinsightsDriverConfig | undefined = undefined;

      expect(value).toBeUndefined();
    });
  });

  describe('Types', () => {
    it('exposes LumberjackApplicationinsightsDriverOptions', () => {
      const value: LumberjackApplicationinsightsDriverOptions | undefined = undefined;

      expect(value).toBeUndefined();
    });
  });

  describe('Dependency injection tokens', () => {
    it('exposes lumberjackApplicationinsightsDriverConfigToken', () => {
      const sut = lumberjackApplicationinsightsDriverConfigToken;

      expect(sut).toBeInstanceOf(InjectionToken);
    });
  });

  describe('Angular modules', () => {
    it(`exposes ${LumberjackApplicationinsightsDriverModule.name}`, () => {
      const sut = LumberjackApplicationinsightsDriverModule;

      expect(isClass(sut)).withContext(`${sut.name} is not a class`).toBeTrue();
    });
  });
});
