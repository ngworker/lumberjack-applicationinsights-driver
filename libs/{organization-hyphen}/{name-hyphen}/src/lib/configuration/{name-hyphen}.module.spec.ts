import { TestBed } from '@angular/core/testing';
import {
  LumberjackConfigLevels,
  LumberjackLevel,
  LumberjackLogDriver,
  lumberjackLogDriverToken,
  LumberjackModule,
} from '@ngworker/lumberjack';

import { expectNgModuleToBeGuardedAgainstDirectImport, resolveDependency } from '@internal/test-util';

import { <name-capitalize-united> } from '../log-drivers/<name-hyphen>';

import { <name-capitalize-united>InternalConfig } from './<name-hyphen>-internal.config';
import { <name-capitalize-united>Config } from './<name-hyphen>.config';
import { <name-capitalize-united>Module } from './<name-hyphen>.module';
import { <name-capitalize-united>Options } from './<name-hyphen>.options';

function create<name-capitalize-united>Options(
  extraOptions: { levels?: LumberjackConfigLevels; identifier?: string } = {}
): <name-capitalize-united>Options {
  return {
    someNeededOption: 'some-options',
    ...extraOptions,
  };
}

function create<name-capitalize-united>Config(levels: LumberjackConfigLevels, identifier?: string): <name-capitalize-united>Config {
  const config = {
    levels,
    someNeededOption: 'some-options',
    identifier,
  };

  if (!identifier) {
    delete config.identifier;
  }

  return config;
}

const create<name-capitalize-united> = (
  {
    config,
    isLumberjackModuleImportedFirst = true,
  }: {
    config: <name-capitalize-united>Config;
    isLumberjackModuleImportedFirst?: boolean;
  } = {
    config: create<name-capitalize-united>Config([LumberjackLevel.Verbose], <name-capitalize-united>.driverIdentifier),
  }
) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      <name-capitalize-united>Module.forRoot(config),
      isLumberjackModuleImportedFirst ? [] : LumberjackModule.forRoot(),
    ],
  });

  const [<name-camel>] = (resolveDependency(lumberjackLogDriverToken) as unknown) as LumberjackLogDriver[];

  return <name-camel>;
};
const create<name-capitalize-united>WithOptions = (
  {
    isLumberjackModuleImportedFirst = true,
    options,
  }: {
    isLumberjackModuleImportedFirst?: boolean;
    options: <name-capitalize-united>Options;
  } = { options: create<name-capitalize-united>Options() }
) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      <name-capitalize-united>Module.withOptions(options),
      isLumberjackModuleImportedFirst ? [] : LumberjackModule.forRoot(),
    ],
  });

  const [<name-camel>] = (resolveDependency(lumberjackLogDriverToken) as unknown) as LumberjackLogDriver[];

  return <name-camel>;
};

describe(<name-capitalize-united>Module.name, () => {
  it(`cannot be imported without using the ${<name-capitalize-united>Module.forRoot.name} method`, () => {
    expectNgModuleToBeGuardedAgainstDirectImport(<name-capitalize-united>Module);
  });

  describe(<name-capitalize-united>Module.forRoot.name, () => {
    it('provides the <name-capitalize-united>', () => {
      const <name-camel> = create<name-capitalize-united>();

      expect(<name-camel>).toBeInstanceOf(<name-capitalize-united>);
    });

    it('registers the specified log driver configuration given the specified identifier', () => {
      const expectedConfig = create<name-capitalize-united>Config([LumberjackLevel.Error], 'TestDriverIdentifier');

      const <name-camel> = create<name-capitalize-united>({ config: expectedConfig });

      const actualConfig = <name-camel>.config;
      expect(actualConfig).toEqual(expectedConfig as <name-capitalize-united>InternalConfig);
    });

    it('registers the specified log driver configuration given no identifier', () => {
      const config = create<name-capitalize-united>Config([LumberjackLevel.Error]);
      const expectedConfig = { ...config, identifier: <name-capitalize-united>.driverIdentifier };
      const <name-camel> = create<name-capitalize-united>({ config });

      const actualConfig = <name-camel>.config;
      expect(actualConfig).toEqual(expectedConfig as <name-capitalize-united>InternalConfig);
    });

    it('registers the specified log driver configuration when the Lumberjack module is imported after the <name-capitalize-united> module', () => {
      const expectedConfig = create<name-capitalize-united>Config([LumberjackLevel.Debug], 'TestDriverIdentifier');

      const <name-camel> = create<name-capitalize-united>({
        config: expectedConfig,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = <name-camel>.config;
      expect(actualConfig).toEqual(expectedConfig as <name-capitalize-united>InternalConfig);
    });
  });

  describe(<name-capitalize-united>Module.withOptions.name, () => {
    it('provides the <name-capitalize-united>', () => {
      const <name-camel> = create<name-capitalize-united>WithOptions();

      expect(<name-camel>).toBeInstanceOf(<name-capitalize-united>);
    });

    it('registers the specified options', () => {
      const options = create<name-capitalize-united>Options();

      const <name-camel> = create<name-capitalize-united>WithOptions({ options });

      const actualConfig = <name-camel>.config;
      const expectedConfig: <name-capitalize-united>InternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
        // tslint:disable-next-line: no-any
        identifier: jasmine.any(String) as any,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('registers the specified options with custom levels', () => {
      const customLevels: LumberjackConfigLevels = [LumberjackLevel.Critical];
      const options = create<name-capitalize-united>Options({ levels: customLevels });

      const <name-camel> = create<name-capitalize-united>WithOptions({ options });

      const actualConfig = <name-camel>.config;
      const expectedConfig: <name-capitalize-united>InternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: customLevels,
        // tslint:disable-next-line: no-any
        identifier: jasmine.any(String) as any,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('registers the specified options with custom identifier', () => {
      const customIdentifier = 'TestDriverIdentifier';
      const options = create<name-capitalize-united>Options({ identifier: customIdentifier });

      const <name-camel> = create<name-capitalize-united>WithOptions({ options });

      const actualConfig = <name-camel>.config;
      const expectedConfig: <name-capitalize-united>InternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
        identifier: customIdentifier,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('gets default options from the log driver config', () => {
      const options = create<name-capitalize-united>Options();

      const <name-camel> = create<name-capitalize-united>WithOptions({ options });

      const { levels, identifier } = <name-camel>.config;
      expect(levels).toEqual([LumberjackLevel.Verbose]);
      expect(identifier).toEqual(<name-capitalize-united>.driverIdentifier);
    });

    it('does register the specified log driver configuration when the lumberjack module is imported after the <name-capitalize-united> module', () => {
      const options = create<name-capitalize-united>Options();

      const <name-camel> = create<name-capitalize-united>WithOptions({
        options,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = <name-camel>.config;
      const expectedConfig: <name-capitalize-united>InternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
        identifier: <name-capitalize-united>.driverIdentifier,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });
  });
});
