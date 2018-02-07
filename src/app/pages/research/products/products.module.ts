import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SmartadminFormsModule } from '../../../shared/forms/smartadmin-forms.module';
import { SmartadminModule } from '../../../shared/smartadmin.module';
import { DynamicDatatableModule } from '../../../shared/ui/dynamic-datatable/dynamic-datatable.module';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SmartadminFormsModule,
    SmartadminModule,
    DynamicDatatableModule,
    TagInputModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
