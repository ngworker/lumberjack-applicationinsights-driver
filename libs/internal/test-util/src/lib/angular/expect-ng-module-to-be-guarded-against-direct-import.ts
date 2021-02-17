import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

/**
 * Assert that an NgModule is guarded against direct import.
 */
export const expectNgModuleToBeGuardedAgainstDirectImport = <TModule>(ngModuleType: Type<TModule>) => {
  expect(() => {
    TestBed.inject(ngModuleType);
  })
    .withContext(`${ngModuleType.name} must guard against being imported directly`)
    .toThrow();
};
