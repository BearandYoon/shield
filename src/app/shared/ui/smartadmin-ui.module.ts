import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {SmartProgressbarModule} from './smart-progressbar/smart-progressbar.module';
// import {TreeViewModule} from './tree-view/tree-view.module';
// import {JqueryUiModule} from './jquery-ui/jquery-ui.module';
// import {NestableListModule} from './nestable-list/nestable-list.module';
import { LoadingIndicatorModule } from './loading-indicator/loading-indicator.module';

@NgModule({
  imports: [CommonModule],

  exports: [ LoadingIndicatorModule ],

  declarations: [],
  // exports: [SmartProgressbarModule, JqueryUiModule, NestableListModule, TreeViewModule, LoadingIndicatorModule],
})
export class SmartadminUiModule{}
