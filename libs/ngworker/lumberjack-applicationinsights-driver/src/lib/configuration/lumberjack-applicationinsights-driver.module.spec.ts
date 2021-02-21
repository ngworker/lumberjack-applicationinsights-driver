import { TestBed } from '@angular/core/testing';

import { expectNgModuleToBeGuardedAgainstDirectImport, resolveDependency } from '@internal/test-util';
import {
  LumberjackConfigLevels,
  LumberjackLevel,
  LumberjackLogDriver,
  lumberjackLogDriverToken,
  LumberjackModule,
} from '@ngworker/lumberjack';

import { LumberjackApplicationinsightsDriver } from '../log-drivers/lumberjack-applicationinsights-driver';

import { LumberjackApplicationinsightsDriverInternalConfig } from './lumberjack-applicationinsights-driver-internal.config';
import { LumberjackApplicationinsightsDriverConfig } from './lumberjack-applicationinsights-driver.config';
import { LumberjackApplicationinsightsDriverModule } from './lumberjack-applicationinsights-driver.module';
import { LumberjackApplicationinsightsDriverOptions } from './lumberjack-applicationinsights-driver.options';

function createLumberjackApplicationinsightsDriverOptions(
  extraOptions: { levels?: LumberjackConfigLevels; identifier?: string } = {}
): LumberjackApplicationinsightsDriverOptions {
  return {
    instrumentationKey: 'dummy-key',
    loggingLevelConsole: 3,
    ...extraOptions,
  };
}

function createLumberjackApplicationinsightsDriverConfig(
  levels: LumberjackConfigLevels,
  identifier?: string
): LumberjackApplicationinsightsDriverConfig {
  const config = {
    levels,
    instrumentationKey: 'dummy-key',
    loggingLevelConsole: 3,
    identifier,
  };

  if (!identifier) {
    delete config.identifier;
  }

  return config;
}

const createLumberjackApplicationinsightsDriver = (
  {
    config,
    isLumberjackModuleImportedFirst = true,
  }: {
    config: LumberjackApplicationinsightsDriverConfig;
    isLumberjackModuleImportedFirst?: boolean;
  } = {
    config: createLumberjackApplicationinsightsDriverConfig(
      [LumberjackLevel.Verbose],
      LumberjackApplicationinsightsDriver.driverIdentifier
    ),
  }
) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      LumberjackApplicationinsightsDriverModule.forRoot(config),
      isLumberjackModuleImportedFirst ? [] : LumberjackModule.forRoot(),
    ],
  });

  const [lumberjackApplicationinsightsDriver] = (resolveDependency(
    lumberjackLogDriverToken
  ) as unknown) as LumberjackLogDriver[];

  return lumberjackApplicationinsightsDriver;
};
const createLumberjackApplicationinsightsDriverWithOptions = (
  {
    isLumberjackModuleImportedFirst = true,
    options,
  }: {
    isLumberjackModuleImportedFirst?: boolean;
    options: LumberjackApplicationinsightsDriverOptions;
  } = { options: createLumberjackApplicationinsightsDriverOptions() }
) => {
  TestBed.configureTestingModule({
    imports: [
      isLumberjackModuleImportedFirst ? LumberjackModule.forRoot() : [],
      LumberjackApplicationinsightsDriverModule.withOptions(options),
      isLumberjackModuleImportedFirst ? [] : LumberjackModule.forRoot(),
    ],
  });

  const [lumberjackApplicationinsightsDriver] = (resolveDependency(
    lumberjackLogDriverToken
  ) as unknown) as LumberjackLogDriver[];

  return lumberjackApplicationinsightsDriver;
};

describe(LumberjackApplicationinsightsDriverModule.name, () => {
  it(`cannot be imported without using the ${LumberjackApplicationinsightsDriverModule.forRoot.name} method`, () => {
    expectNgModuleToBeGuardedAgainstDirectImport(LumberjackApplicationinsightsDriverModule);
  });

  describe(LumberjackApplicationinsightsDriverModule.forRoot.name, () => {
    it('provides the LumberjackApplicationinsightsDriver', () => {
      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriver();

      expect(lumberjackApplicationinsightsDriver).toBeInstanceOf(LumberjackApplicationinsightsDriver);
    });

    it('registers the specified log driver configuration given the specified identifier', () => {
      const expectedConfig = createLumberjackApplicationinsightsDriverConfig(
        [LumberjackLevel.Error],
        'TestDriverIdentifier'
      );

      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriver({ config: expectedConfig });

      const actualConfig = lumberjackApplicationinsightsDriver.config;
      expect(actualConfig).toEqual(expectedConfig as LumberjackApplicationinsightsDriverInternalConfig);
    });

    it('registers the specified log driver configuration given no identifier', () => {
      const config = createLumberjackApplicationinsightsDriverConfig([LumberjackLevel.Error]);
      const expectedConfig = { ...config, identifier: LumberjackApplicationinsightsDriver.driverIdentifier };
      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriver({ config });

      const actualConfig = lumberjackApplicationinsightsDriver.config;
      expect(actualConfig).toEqual(expectedConfig as LumberjackApplicationinsightsDriverInternalConfig);
    });

    it('registers the specified log driver configuration when the Lumberjack module is imported after the LumberjackApplicationinsightsDriver module', () => {
      const expectedConfig = createLumberjackApplicationinsightsDriverConfig(
        [LumberjackLevel.Debug],
        'TestDriverIdentifier'
      );

      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriver({
        config: expectedConfig,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = lumberjackApplicationinsightsDriver.config;
      expect(actualConfig).toEqual(expectedConfig as LumberjackApplicationinsightsDriverInternalConfig);
    });
  });

  describe(LumberjackApplicationinsightsDriverModule.withOptions.name, () => {
    it('provides the LumberjackApplicationinsightsDriver', () => {
      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriverWithOptions();

      expect(lumberjackApplicationinsightsDriver).toBeInstanceOf(LumberjackApplicationinsightsDriver);
    });

    it('registers the specified options', () => {
      const options = createLumberjackApplicationinsightsDriverOptions();

      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriverWithOptions({ options });

      const actualConfig = lumberjackApplicationinsightsDriver.config;
      const expectedConfig: LumberjackApplicationinsightsDriverInternalConfig = {
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
      const options = createLumberjackApplicationinsightsDriverOptions({ levels: customLevels });

      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriverWithOptions({ options });

      const actualConfig = lumberjackApplicationinsightsDriver.config;
      const expectedConfig: LumberjackApplicationinsightsDriverInternalConfig = {
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
      const options = createLumberjackApplicationinsightsDriverOptions({ identifier: customIdentifier });

      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriverWithOptions({ options });

      const actualConfig = lumberjackApplicationinsightsDriver.config;
      const expectedConfig: LumberjackApplicationinsightsDriverInternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
        identifier: customIdentifier,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });

    it('gets default options from the log driver config', () => {
      const options = createLumberjackApplicationinsightsDriverOptions();

      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriverWithOptions({ options });

      const { levels, identifier } = lumberjackApplicationinsightsDriver.config;
      expect(levels).toEqual([LumberjackLevel.Verbose]);
      expect(identifier).toEqual(LumberjackApplicationinsightsDriver.driverIdentifier);
    });

    it('does register the specified log driver configuration when the lumberjack module is imported after the LumberjackApplicationinsightsDriver module', () => {
      const options = createLumberjackApplicationinsightsDriverOptions();

      const lumberjackApplicationinsightsDriver = createLumberjackApplicationinsightsDriverWithOptions({
        options,
        isLumberjackModuleImportedFirst: false,
      });

      const actualConfig = lumberjackApplicationinsightsDriver.config;
      const expectedConfig: LumberjackApplicationinsightsDriverInternalConfig = {
        ...options,
        // tslint:disable-next-line: no-any
        levels: jasmine.any(Array) as any,
        identifier: LumberjackApplicationinsightsDriver.driverIdentifier,
      };
      expect(actualConfig).toEqual(expectedConfig);
    });
  });
});
