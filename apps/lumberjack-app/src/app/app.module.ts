import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';
import { LumberjackApplicationinsightsDriverModule } from '@ngworker/lumberjack-applicationinsights-driver';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LumberjackModule.forRoot(),
    LumberjackApplicationinsightsDriverModule.forRoot({
      levels: [LumberjackLevel.Verbose],
      instrumentationKey: environment.appInsights.instrumentationKey,
      loggingLevelConsole: 3,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
