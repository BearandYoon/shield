import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminFormsModule } from '../../../shared/forms/smartadmin-forms.module';
import { SmartadminModule } from '../../../shared/smartadmin.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SmartadminDatatableModule,
    SmartadminFormsModule,
    SmartadminModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
