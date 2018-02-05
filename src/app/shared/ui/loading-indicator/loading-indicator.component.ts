import {Component, Input} from '@angular/core';

@Component({

  selector: 'loading-indicator',
  template: `
    <div class="sa-loading-container">
      <div class="sa-loading-body">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <span class="sr-only">...</span>
        <div class="sa-loading-detail">{{title}}</div>
      </div>
    </div>`,
    styleUrls: ['loading-indicator.component.css'],
})
export class LoadingIndicatorComponent {

  @Input() title: any = "Loading..";

}
