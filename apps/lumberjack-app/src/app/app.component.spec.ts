import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';
import { LumberjackApplicationinsightsDriverModule } from '@ngworker/lumberjack-applicationinsights-driver';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        LumberjackModule.forRoot(),
        LumberjackApplicationinsightsDriverModule.forRoot({
          levels: [LumberjackLevel.Verbose],
          instrumentationKey: 'dummy-key',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
