import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResearchRoutingModule } from './research-routing.module';
import { ResearchComponent } from './research.component';
import { NavigationModule } from '../../shared/layout/navigation/navigation.module';

@NgModule({
  imports: [
    CommonModule,
    ResearchRoutingModule,
    NavigationModule
  ],
  declarations: [
    ResearchComponent
  ]
})
export class ResearchModule { }
