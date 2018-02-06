import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminDatatableModule } from '../datatable/smartadmin-datatable.module';
import { DynamicDatatableComponent } from './dynamic-datatable.component';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';

@NgModule({
    imports: [
        CommonModule,
        SmartadminDatatableModule,
        LoadingIndicatorModule
    ],
    declarations: [DynamicDatatableComponent],
    exports: [DynamicDatatableComponent],
})
export class DynamicDatatableModule { }
