import { Component } from '@angular/core';
import { LoadingIndicatorService } from './loading-indicator.service';

@Component({

  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['loading-indicator.component.css'],
})
export class LoadingIndicatorComponent {

  title = 'Loading..';

  constructor() {}

}
