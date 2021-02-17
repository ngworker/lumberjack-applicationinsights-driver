import { ModuleWithProviders, NgModule } from '@angular/core';

import { expectNgModuleToBeGuardedAgainstDirectImport } from './expect-ng-module-to-be-guarded-against-direct-import';

@NgModule()
class GuardedModule {
  static forRoot(): ModuleWithProviders<GuardedModule> {
    return {
      ngModule: GuardedModule,
    };
  }

  constructor() {
    throw new Error('Do not import GuardedModule directly. Use GuardedModule.forRoot.');
  }
}

describe(expectNgModuleToBeGuardedAgainstDirectImport.name, () => {
  it('passes Angular modules guarded against direct import', () => {
    expectNgModuleToBeGuardedAgainstDirectImport(GuardedModule);
  });
});
