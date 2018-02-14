import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputModule } from 'ngx-chips';
import { DxRangeSliderModule } from 'devextreme-angular';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SmartadminFormsModule } from '../../../shared/forms/smartadmin-forms.module';
import { SmartadminModule } from '../../../shared/smartadmin.module';
import { DynamicDatatableModule } from '../../../shared/ui/dynamic-datatable/dynamic-datatable.module';
import { ProductsService } from './services/products.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SmartadminFormsModule,
    SmartadminModule,
    DynamicDatatableModule,
    TagInputModule,
    DxRangeSliderModule
  ],
  declarations: [ProductsComponent],
  providers: [ProductsService]
})
export class ProductsModule { }
