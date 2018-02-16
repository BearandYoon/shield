import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TagInputModule } from 'ngx-chips';

import { campaignsRouting } from './campaigns.routing';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsService } from './services/campaigns.service';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { SmartadminInputModule } from '../../shared/forms/input/smartadmin-input.module';
import { DynamicDatatableModule } from '../../shared/dynamic-datatable/dynamic-datatable.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        campaignsRouting,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        TagInputModule,
        SmartadminInputModule,
        DynamicDatatableModule
    ],
    declarations: [
        CampaignsComponent,
        NewCampaignComponent
    ],
    providers: [CampaignsService],
    entryComponents: [NewCampaignComponent]
})
export class CampaignsModule { }
