import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResearchRoutingModule } from './research-routing.module';
import { ResearchComponent } from './research.component';
import { NavigationModule } from '../../shared/layout/navigation/navigation.module';

import { ResearchService } from '../../core/services/ResearchService/research.service';

import { ProductsModule } from './products/products.module';

@NgModule({
  imports: [
    CommonModule,
    ResearchRoutingModule,
    NavigationModule,
    ProductsModule
  ],
  declarations: [
    ResearchComponent
  ],
  providers: [
    ResearchService
  ]
})
export class ResearchModule { }
