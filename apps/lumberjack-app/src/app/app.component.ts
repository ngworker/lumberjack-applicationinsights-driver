import { Component, OnInit, VERSION } from '@angular/core';

import { AppLogger } from './app-logger.service';
import { LogPayload } from './log-payload';

const CONTROLS = ['Trace', 'Debug', 'Info', 'Error', 'Warning', 'Critical'] as const;
type Control = typeof CONTROLS[number];

@Component({
  selector: 'ngworker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  payload: LogPayload = {
    angularVersion: VERSION.full,
    timestamp: Date.now(),
    fakeObj: {
      a: 'a1',
      b: 'b1',
    },
    fakeArr: [3, 5, 8],
  };

  readonly controls = CONTROLS;

  constructor(private logger: AppLogger) {}

  ngOnInit(): void {}

  onControlClick(controlType: Control): void {
    switch (controlType) {
      case 'Trace':
        this.logger.trace('Just trace', this.payload);
        break;
      case 'Debug':
        this.logger.debug('New debug', this.payload);
        break;
      case 'Info':
        this.logger.info('For your info', this.payload);
        break;
      case 'Error':
        this.logger.error('Error', new Error('Exception raised'));
        break;
      case 'Warning':
        this.logger.warning('Warning!', this.payload);
        break;
      case 'Critical':
        this.logger.critical('Something critical happened', new Error('Critical Exception occured'));
        break;
      default:
        break;
    }
  }
}
