import { <name-capitalize-united>RootModule } from './<name-hyphen>-root.module';

describe(<name-capitalize-united>RootModule.name, () => {
  it('guards against being registered in multiple injectors', () => {
    const rootInjectorInstance = new <name-capitalize-united>RootModule();

    expect(() => new <name-capitalize-united>RootModule(rootInjectorInstance)).toThrowError(/multiple injectors/);
  });

  it('does not guard the first injector that registers it', () => {
    expect(() => new <name-capitalize-united>RootModule()).not.toThrow();
  });
});
