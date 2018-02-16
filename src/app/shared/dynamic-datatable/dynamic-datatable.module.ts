import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicDatatableComponent } from './dynamic-datatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    declarations: [DynamicDatatableComponent],
    exports: [DynamicDatatableComponent],
})
export class DynamicDatatableModule { }
