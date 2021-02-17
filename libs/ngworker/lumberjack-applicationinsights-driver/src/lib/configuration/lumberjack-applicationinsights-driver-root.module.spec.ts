import { LumberjackApplicationinsightsDriverRootModule } from './lumberjack-applicationinsights-driver-root.module';

describe(LumberjackApplicationinsightsDriverRootModule.name, () => {
  it('guards against being registered in multiple injectors', () => {
    const rootInjectorInstance = new LumberjackApplicationinsightsDriverRootModule();

    expect(() => new LumberjackApplicationinsightsDriverRootModule(rootInjectorInstance)).toThrowError(
      /multiple injectors/
    );
  });

  it('does not guard the first injector that registers it', () => {
    expect(() => new LumberjackApplicationinsightsDriverRootModule()).not.toThrow();
  });
});
