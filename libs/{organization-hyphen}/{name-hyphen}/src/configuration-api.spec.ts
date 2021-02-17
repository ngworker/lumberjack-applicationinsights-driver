import { InjectionToken } from '@angular/core';

import { isClass } from '@internal/test-util';

import {
  <name-capitalize-united>Config,
  <name-camel>ConfigToken,
  <name-capitalize-united>Module,
  <name-capitalize-united>Options
} from './index';

describe('Configuration API', () => {
  describe('Interfaces', () => {
    it('exposes <name-capitalize-united>Config', () => {
      const value: <name-capitalize-united>Config | undefined = undefined;

      expect(value).toBeUndefined();
    });
  });

  describe('Types', () => {
    it('exposes <name-capitalize-united>Options', () => {
      const value: <name-capitalize-united>Options | undefined = undefined;

      expect(value).toBeUndefined();
    });
  });

  describe('Dependency injection tokens', () => {
    it('exposes <name-camel>ConfigToken', () => {
      const sut = <name-camel>ConfigToken;

      expect(sut).toBeInstanceOf(InjectionToken);
    });
  });

  describe('Angular modules', () => {
    it(`exposes ${<name-capitalize-united>Module.name}`, () => {
      const sut = <name-capitalize-united>Module;

      expect(isClass(sut)).withContext(`${sut.name} is not a class`).toBeTrue();
    });
  });
});
