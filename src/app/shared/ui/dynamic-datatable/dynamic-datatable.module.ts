import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminDatatableModule } from '../datatable/smartadmin-datatable.module';
import { DynamicDatatableComponent } from './dynamic-datatable.component';

@NgModule({
    imports: [
        CommonModule,
        SmartadminDatatableModule
    ],
    declarations: [DynamicDatatableComponent],
    exports: [DynamicDatatableComponent],
})
export class DynamicDatatableModule { }
