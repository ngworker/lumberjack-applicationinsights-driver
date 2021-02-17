import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';

import { <name-capitalize-united>Module } from '@<organization-hyphen>/<name-hyphen>';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        LumberjackModule.forRoot(),
        <name-capitalize-united>Module.forRoot({ levels: [LumberjackLevel.Verbose], someNeededOption: 'option-value' }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });


  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lumberjack'`, () => {
    expect(app.title).toEqual('lumberjack');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const query = fixture.nativeElement.querySelector('.content span');
    expect(query && query.textContent).toContain('lumberjack app is running!');
  });
});


